import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { CartItems } from './cart-items.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CartItemsService {

    private resourceUrl = 'api/cart-items';
    private resourceSearchUrl = 'api/_search/cart-items';

    constructor(private http: Http) { }

    create(cartItems: CartItems): Observable<CartItems> {
        const copy = this.convert(cartItems);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(cartItems: CartItems): Observable<CartItems> {
        const copy = this.convert(cartItems);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<CartItems> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(cartItems: CartItems): CartItems {
        const copy: CartItems = Object.assign({}, cartItems);
        return copy;
    }
}
