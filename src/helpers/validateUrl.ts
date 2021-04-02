import url from "url";
import dns from "dns";

function validateUrl(longUrl: string): Promise<unknown> {
  const { hostname } = new url.URL(longUrl);
  return new Promise((resolve, reject) => {
    dns.lookup(hostname, (err, address) => {
      if (err) reject(err);
      resolve(address);
    });
  });
}

export default validateUrl;
