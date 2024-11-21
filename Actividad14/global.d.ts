declare module 'cors' {
    import { Request, Response, NextFunction } from 'express';
  
    function cors(options?: any): (req: Request, res: Response, next: NextFunction) => void;
  
    export = cors;
  }
  