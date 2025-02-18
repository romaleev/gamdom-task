import { z } from 'zod'
import { Request, Response, NextFunction } from 'express'

export const validateRequest =
	(prop: 'params' | 'body', schema: z.Schema) =>
	(req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse(req[prop])
		if (!result.success) {
			res.status(400).json({ error: result.error.flatten() })
			return
		}
		Object.assign(req[prop], result.data)
		next()
	}
