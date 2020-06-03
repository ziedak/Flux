import * as Joi from '@hapi/joi'



// This is the JOI validation schema, you define
// all the validation logic in here, then run
// the validation during the request lifecycle.
// If you prefer to use your own way of validating the 
// incoming data, you can use it.
const schema = Joi.object<import('../../types').Matrix>({

})

export default async (req: import('next').NextApiRequest, res: import('next').NextApiResponse) => {
  try {
    // This will throw when the validation fails
    const data = await schema.validateAsync(req.body, {
      abortEarly: false
    }) as import('../../types').Matrix

    // Write the new matrix to public/pricing.json

    res.statusCode = 200
    res.json(data)
  } catch(e) {
    console.error(e)
    if(e.isJoi) {
      // Handle the validation error and return a proper response
      res.statusCode = 422
      res.end('Error')
      return
    }
    
    res.statusCode = 500
    res.json({ error: 'Unknown Error' })
  }
}