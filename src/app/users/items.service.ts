import { Injectable } from '@angular/core';

interface Predicate<T> {
    (item: T): boolean
}

@Injectable()
export class ItemsService {

    constructor() { }

    /*
    Removes an item from an array using the lodash library
    */
    removeItemFromArray<T>(array: Array<T>, item: any) {
    }

    removeItems<T>(array: Array<T>, predicate: Predicate<T>) {
    }

    /*
    Finds a specific item in an array using a predicate and repsaces it
    */
    setItem<T>(array: Array<T>, predicate: Predicate<T>, item: T) {
        var _oldItem = array.find(predicate);
        if(_oldItem){
            var index = array.indexOf(_oldItem);
            array.splice(index, 1, item);
        } else {
            array.push(item);
        }
    }

    /*
    Adds an item to zero index
    */
    addItemToStart<T>(array: Array<T>, item: any) {
        array.splice(0, 0, item);
    }

    /*
    From an array of type T, select all values of type R for property
    */
    getPropertyValues<T, R>(array: Array<T>, property : string) : R
    {
        var result;
        return <R><any>result;
    }

    /*
    Util method to serialize a string to a specific Type
    */
    getSerialized<T>(arg: any): T {
        return <T>JSON.parse(JSON.stringify(arg));
    }
}
