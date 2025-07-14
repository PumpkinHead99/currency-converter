// Body Middleware for routes
import { Request, Response, NextFunction, RequestHandler } from 'express';

export function BodyMiddleware<T>(template: Record<keyof T, string>): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        validateAgainstTemplate(req.body, template);
        next();
    };
}

/**
 * Validates body against custom validation template
 * @param body Object to validate
 * @param template Validation template
 */
function validateAgainstTemplate<T>(body: any, template: Record<keyof T, string>): void {
    if (typeof body !== 'object' || body === null) {
        throw new Error('Request body must be an object');
    }

    // Check body each property types against template
    for (const key in template) {
        if (!body.hasOwnProperty(key)) {
            throw new Error(`Missing property: ${key}`);
        }

        const expectedType = template[key];
        const actualType = typeof body[key];

        if (actualType !== expectedType) {
            throw new Error(`Invalid type for property '${key}': expected '${expectedType}', got '${actualType}'`);
        }
    }

    // Check for unexpected properties
    for (const key in body) {
        if (!(key in template)) {
            throw new Error(`Unexpected property: ${key}`);
        }
    }
}