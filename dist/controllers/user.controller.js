"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const Url_1 = __importDefault(require("../models/Url"));
const apiError_1 = __importDefault(require("../errors/apiError"));
const response_1 = __importDefault(require("../helpers/response"));
const errorFormatter_1 = __importDefault(require("../helpers/errorFormatter"));
const jwtHelper_1 = require("../helpers/jwtHelper");
const config_1 = __importDefault(require("../configs/config"));
const nodemailer_1 = __importDefault(require("../configs/nodemailer"));
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req).formatWith(errorFormatter_1.default);
        if (!errors.isEmpty()) {
            const msg = errors.array();
            next(apiError_1.default.badRequest(msg[0]));
            return;
        }
        const userFromBody = req.body;
        const { email } = userFromBody;
        let user = yield User_1.default.findByEmail(email);
        if (user) {
            next(apiError_1.default.badRequest("Email already taken."));
            return;
        }
        user = new User_1.default(userFromBody);
        yield user.save();
        const result = {
            status: "success",
            data: user,
        };
        const serverResponse = {
            result: result,
            statusCode: 201,
            contentType: "application/json",
        };
        return response_1.default(res, serverResponse);
    }
    catch (error) {
        next(apiError_1.default.internal(`Something went wrong: ${error.message}`));
        return;
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req).formatWith(errorFormatter_1.default);
        if (!errors.isEmpty()) {
            const msg = errors.array();
            next(apiError_1.default.badRequest(msg[0]));
            return;
        }
        const { email, password } = req.body;
        const user = yield User_1.default.findByEmail(email);
        if (!user) {
            next(apiError_1.default.badRequest("Email is incorrect."));
            return;
        }
        const newUser = new User_1.default(user);
        if (yield newUser.comparePassword(password)) {
            const payload = {
                _id: newUser._id.toString(),
            };
            const accessToken = jwtHelper_1.signToken(payload, config_1.default.jwtExpiresNum);
            const result = {
                status: "success",
                data: { accessToken: accessToken },
            };
            const serverResponse = {
                result: result,
                statusCode: 200,
                contentType: "application/json",
            };
            const options = {
                maxAge: Number(config_1.default.jwtExpiresNum),
                secure: config_1.default.env === "production" ? true : false,
                httpOnly: config_1.default.env === "production" ? true : false,
            };
            res.cookie("token", accessToken, options);
            return response_1.default(res, serverResponse);
        }
        else {
            next(apiError_1.default.badRequest("Incorrect password."));
            return;
        }
    }
    catch (error) {
        next(apiError_1.default.internal(`Something went wrong: ${error.message}`));
        return;
    }
});
const me = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const user = yield User_1.default.findMe(id);
        if (user[0]) {
            const result = { status: "success", data: user[0] };
            const serverResponse = {
                result: result,
                statusCode: 200,
                contentType: "application/json",
            };
            return response_1.default(res, serverResponse);
        }
        next(apiError_1.default.notFound("User not found"));
        return;
    }
    catch (error) {
        next(apiError_1.default.internal(`Something went wrong: ${error.message}`));
        return;
    }
});
const logOut = (_req, res, _next) => {
    const options = {
        maxAge: 0,
        secure: config_1.default.env === "production" ? true : false,
        httpOnly: config_1.default.env === "production" ? true : false,
    };
    res.cookie("token", "", options).send();
};
const loggedIn = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token)
            return res.send("");
        yield jwtHelper_1.verifyToken({ token, secretKey: String(config_1.default.jwtSecret) });
        res.send(token);
    }
    catch (err) {
        res.send("");
    }
});
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req).formatWith(errorFormatter_1.default);
        if (!errors.isEmpty()) {
            const msg = errors.array();
            next(apiError_1.default.badRequest(msg[0]));
            return;
        }
        const { email } = req.body;
        const user = yield User_1.default.findByEmail(email);
        if (user) {
            const oAuth2Client = new googleapis_1.google.auth.OAuth2(config_1.default.oauth.CLIENT_ID, config_1.default.oauth.CLIENT_SECRET, config_1.default.oauth.REDIRECT_URI);
            oAuth2Client.setCredentials({
                refresh_token: config_1.default.oauth.REFRESH_TOKEN,
            });
            const accessToken = yield oAuth2Client.getAccessToken();
            const transporter = yield nodemailer_1.default(accessToken);
            const { _id } = user;
            const payload = { _id: _id.toString() };
            const token = jwtHelper_1.signToken(payload, "5m");
            const mailOptions = {
                from: config_1.default.nodeMailer.email,
                to: email,
                subject: `Password Reset link`,
                html: `
                    <h1>Please use the following link to reset your password</h1>
                    <p>${config_1.default.url}/user/password-reset/${token}</p>
                    <hr />
                    <p>This email may contain sensitive information</p>
                    <p>${config_1.default.url}</p>
                `,
            };
            transporter.sendMail(mailOptions, (error, _body) => {
                if (error) {
                    next(apiError_1.default.internal(`Something went wrong: ${error.message}`));
                    return;
                }
                const result = {
                    status: "success",
                    data: {
                        message: `Email has been sent to ${email}. Follow the instruction to reset your password.`,
                    },
                };
                const serverResponse = {
                    result: result,
                    statusCode: 200,
                    contentType: "application/json",
                };
                return response_1.default(res, serverResponse);
            });
        }
        else {
            next(apiError_1.default.notFound("User with that email does not exist"));
            return;
        }
    }
    catch (error) {
        next(apiError_1.default.internal(`Something went wrong: ${error.message}`));
        return;
    }
});
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req).formatWith(errorFormatter_1.default);
        if (!errors.isEmpty()) {
            const msg = errors.array();
            next(apiError_1.default.badRequest(msg[0]));
            return;
        }
        const { newPassword, token, } = req.body;
        const result = yield jwtHelper_1.verifyToken({
            token,
            secretKey: String(config_1.default.jwtSecret),
        });
        const { _id, error } = result;
        if (error) {
            next(apiError_1.default.badRequest(error));
            return;
        }
        const updateObject = {
            password: yield User_1.default.manualHashPassword(newPassword),
        };
        const { success, data, statusCode } = yield User_1.default.updateById(_id, updateObject);
        if (success) {
            const result = {
                status: "success",
                data: data,
            };
            const serverResponse = {
                result: result,
                statusCode: statusCode,
                contentType: "application/json",
            };
            return response_1.default(res, serverResponse);
        }
        next(apiError_1.default.notFound(data.message));
        return;
    }
    catch (error) {
        next(apiError_1.default.internal(`Something went wrong: ${error.message}`));
        return;
    }
});
const verifyEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const user = yield User_1.default.findById(userId);
        if (user) {
            let serverResponse;
            let result;
            const { _id, status, email, role } = user;
            if (status === "inactive") {
                const oAuth2Client = new googleapis_1.google.auth.OAuth2(config_1.default.oauth.CLIENT_ID, config_1.default.oauth.CLIENT_SECRET, config_1.default.oauth.REDIRECT_URI);
                oAuth2Client.setCredentials({
                    refresh_token: config_1.default.oauth.REFRESH_TOKEN,
                });
                const accessToken = yield oAuth2Client.getAccessToken();
                const transporter = yield nodemailer_1.default(accessToken);
                const payload = { _id: _id.toString() };
                const token = jwtHelper_1.signToken(payload, "5m");
                const mailOptions = {
                    from: config_1.default.nodeMailer.email,
                    to: email,
                    subject: "Account activation link",
                    body: "Thank you for choosing ShortIT !",
                    html: `
           		<h1>Please use the following to activate your account</h1>
           		<p>${config_1.default.url}/user/activate/${token}</p>
           		<hr />
           		<p>This email may contain sensitive information</p>
           		<p>${config_1.default.url}</p>
           		 `,
                };
                transporter.sendMail(mailOptions, (error, body) => {
                    if (error) {
                        console.log(error);
                        next(apiError_1.default.internal(`Something went wrong: ${error.message}`));
                        return;
                    }
                    result = {
                        status: "success",
                        data: {
                            message: "Confirmation email is sent! Please check your email.",
                        },
                    };
                    serverResponse = {
                        result: result,
                        statusCode: 200,
                        contentType: "application/json",
                    };
                    return response_1.default(res, serverResponse);
                });
            }
            else {
                result = {
                    status: "success",
                    data: {
                        message: "Email is already verified",
                    },
                };
                serverResponse = {
                    result: result,
                    statusCode: 200,
                    contentType: "application/json",
                };
                return response_1.default(res, serverResponse);
            }
        }
        else {
            next(apiError_1.default.notFound("User doesn't exist."));
            return;
        }
    }
    catch (error) {
        next(apiError_1.default.internal(`Something went wrong: ${error.message}`));
        return;
    }
});
const activation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req).formatWith(errorFormatter_1.default);
        if (!errors.isEmpty()) {
            const msg = errors.array();
            next(apiError_1.default.badRequest(msg[0]));
            return;
        }
        const { token } = req.body;
        const result = yield jwtHelper_1.verifyToken({
            token,
            secretKey: String(config_1.default.jwtSecret),
        });
        const { _id, error } = result;
        if (error) {
            next(apiError_1.default.badRequest(error));
            return;
        }
        const updateObject = {
            status: "active",
        };
        const { statusCode, success, data } = yield User_1.default.updateById(_id, updateObject);
        if (success) {
            const response = {
                status: "success",
                data: { message: "User activated successfully." },
            };
            const serverResponse = {
                result: response,
                statusCode: statusCode,
                contentType: "application/json",
            };
            return response_1.default(res, serverResponse);
        }
        else {
            next(apiError_1.default.notFound(data.message));
            return;
        }
    }
    catch (err) {
        next(apiError_1.default.internal(`Something went wrong. ${err.message}`));
        return;
    }
});
const changeEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { email } = req.body;
        const user = yield User_1.default.findByEmail(email);
        const { id, role } = req.user;
        if (user && user._id.toString() !== userId) {
            next(apiError_1.default.conflict("Email is already taken"));
            return;
        }
        const updateObject = {
            email: email,
            status: "inactive",
        };
        const { success, statusCode, data } = yield User_1.default.updateById(userId, updateObject);
        if (success) {
            const oAuth2Client = new googleapis_1.google.auth.OAuth2(config_1.default.oauth.CLIENT_ID, config_1.default.oauth.CLIENT_SECRET, config_1.default.oauth.REDIRECT_URI);
            oAuth2Client.setCredentials({
                refresh_token: config_1.default.oauth.REFRESH_TOKEN,
            });
            const accessToken = yield oAuth2Client.getAccessToken();
            const transporter = yield nodemailer_1.default(accessToken);
            const payload = { _id: id };
            const token = jwtHelper_1.signToken(payload, "5m");
            const mailOptions = {
                from: config_1.default.nodeMailer.email,
                to: email,
                subject: "Account activation link",
                body: "Thank you for choosing Glasir !",
                html: `
						 <h1>Please use the following to activate your account</h1>
						 <p>${config_1.default.url}/user/activate/${token}</p>
						 <hr />
						 <p>This email may contain sensitive information</p>
						 <p>${config_1.default.url}</p>
							`,
            };
            transporter.sendMail(mailOptions, (error, body) => {
                if (error) {
                    next(apiError_1.default.internal(`Something went wrong: ${error.message}`));
                    return;
                }
                const result = {
                    status: "success",
                    data: {
                        message: "Confirmation email is sent! Please check your email.",
                    },
                };
                const serverResponse = {
                    result: result,
                    statusCode: statusCode,
                    contentType: "application/json",
                };
                return response_1.default(res, serverResponse);
            });
        }
        else {
            next(apiError_1.default.notFound(data.message));
            return;
        }
    }
    catch (error) {
        next(apiError_1.default.internal(`Something went wrong. ${error.message}`));
        return;
    }
});
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { oldPassword, newPassword, } = req.body;
        const user = yield User_1.default.findById(userId);
        if (user) {
            const newUser = new User_1.default(user);
            if (!(yield newUser.comparePassword(oldPassword))) {
                next(apiError_1.default.unauthorized("Make sure your password is correct."));
                return;
            }
            const updateObject = {
                password: yield User_1.default.manualHashPassword(newPassword),
            };
            const { success, statusCode, data } = yield User_1.default.updateById(userId, updateObject);
            if (success) {
                const result = {
                    status: "success",
                    data: { message: "Password changed successfully." },
                };
                const serverResponse = {
                    result: result,
                    statusCode: statusCode,
                    contentType: "application/json",
                };
                return response_1.default(res, serverResponse);
            }
            else {
                next(apiError_1.default.notFound(data.message));
                return;
            }
        }
        next(apiError_1.default.notFound("User doesn't exist."));
        return;
    }
    catch (error) {
        next(apiError_1.default.internal(`Something went wrong. ${error.message}`));
        return;
    }
});
const changeUserDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDetails = req.body;
        const { userId } = req.params;
        const updateObject = Object.assign({}, userDetails);
        const { success, data, statusCode } = yield User_1.default.updateById(userId, updateObject);
        if (success) {
            const result = {
                status: "success",
                data: { message: "Update successfully." },
            };
            const serverResponse = {
                result: result,
                statusCode: statusCode,
                contentType: "application/json",
            };
            return response_1.default(res, serverResponse);
        }
        else {
            next(apiError_1.default.notFound(data.message));
            return;
        }
    }
    catch (error) {
        next(apiError_1.default.internal(`Something went wrong. ${error.message}`));
        return;
    }
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        const { userId } = req.params;
        const user = yield User_1.default.findById(userId);
        if (user) {
            const newUser = new User_1.default(user);
            if (!(yield newUser.comparePassword(password))) {
                next(apiError_1.default.unauthorized("Make sure your password is correct."));
                return;
            }
            const deleteUser = User_1.default.deleteById(userId);
            const deleteUrl = Url_1.default.deleteByUserId(userId);
            yield Promise.all([deleteUser, deleteUrl]);
            const result = {
                status: "success",
                data: { message: "User is deleted successfully" },
            };
            const serverResponse = {
                result: result,
                statusCode: 200,
                contentType: "application/json",
            };
            return response_1.default(res, serverResponse);
        }
        next(apiError_1.default.notFound("User doesn't exist."));
        return;
    }
    catch (e) {
        next(apiError_1.default.internal(`Something went wrong: ${e.message}`));
        return;
    }
});
exports.default = {
    signup,
    login,
    logOut,
    loggedIn,
    me,
    forgotPassword,
    resetPassword,
    verifyEmail,
    activation,
    changeEmail,
    changePassword,
    changeUserDetails,
    deleteUser,
};
//# sourceMappingURL=user.controller.js.map