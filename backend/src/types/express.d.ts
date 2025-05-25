import { Request, Response } from 'express';
import { Database } from './database.types';

export interface TypedRequest<T = any> extends Request {
  body: T;
}

export interface TypedResponse<T = any> extends Response {
  json: (body: T) => TypedResponse<T>;
} 