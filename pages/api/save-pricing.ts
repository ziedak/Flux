import * as Joi from "@hapi/joi";

// This is the JOI validation schema, you define
// all the validation logic in here, then run
// the validation during the request lifecycle.
// If you prefer to use your own way of validating the
// incoming data, you can use it.

const PackagePricingSchema = Joi.object({
  lite: Joi.number().required(),
  standard: Joi.number().required(),
  unlimited: Joi.number().required(),
}).required();

const schema = Joi.object<import("../../types").Matrix>({
  "36months": PackagePricingSchema,
  "24months": PackagePricingSchema,
  "12months": PackagePricingSchema,
  mtm: PackagePricingSchema,
});

export default async (
  req: import("next").NextApiRequest,
  res: import("next").NextApiResponse
) => {
  try {
    console.log("request", req.body);

    // This will throw when the validation fails
    const data = (await schema.validateAsync(req.body, {
      abortEarly: false,
    })) as import("../../types").Matrix;

    const fs = require("fs");
    let matrix = JSON.stringify(data);
    const filePath = `${process.cwd()}/public/pricing.json`;
    fs.writeFileSync(filePath, matrix);

    res.statusCode = 200;
    res.json(data);
  } catch (e) {
    console.error(e);
    if (e.isJoi) {
      // Handle the validation error and return a proper response
      res.statusCode = 422;
      res.json(e);
      //res.end("Error");
      return;
    }

    res.statusCode = 500;
    res.json({ error: "Unknown Error" });
  }
};
