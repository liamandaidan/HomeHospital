import express from 'express'
import fs from 'fs'
import Request from './visitRequest.Model.js'


export class Waitlist {
    #hospital;
    #queueSize;
    #queue = [];
    /**
     * 
     * @param {JS Object} hospital, contains name and hospitalID 
     */
    constructor(hospital) {
        this.#hospital = hospital;
        this.#queueSize = 0;
    }

    /**
     * Add a Request to the end of the queue 
     * @param {Request} Request 
     * @returns 
     */
    enqueue(Request) {
        this.#queue.push(Request);
        this.#queueSize++;
        return 1;
    }

    /**
     * Remove the first Request in the queue. Return -1 if the Request doesn't exist
     * @param {Request} Request 
     * @returns 1 on success, -1 if Request doesn't exist
     */
    dequeue(Request) {
        if(this.#queue.includes(Request)) {
            this.#queue = this.#queue.shift();
            this.#queueSize--;
            return 1;
        } else {
            return -1;
        }
        
    }

    /**
     * Add a Request to a specific place in the queue. position refers to the place in the queue to
     * insert, and the 0 refers to the number of elements to remove, in this case none. Inserting the
     * new Request here will shift elements to the right of position.
     * @param {Request} Request 
     * @param {int} position 
     * @returns 1 on success, -1 if the position is out of bounds of the queue
     */
    insert(Request, position) {
        if(position > this.#queue.length || position < 0) {
            return -1;
        }
        if(this.#queue[position] === undefined ||this.#queue[position] === null)
        {
            this.#queue[position] = Request;
            this.#queueSize++;
            return 1;
        } else {
            this.#queue.splice(position, 0, Request);
            this.#queueSize++;
            return 1;    
        }
    }

    /**
     * This method is identical to the insert method, except that it doesn't check that the position is within the bounds
     * of the existing queue. This method is only called on initial loading of the waitlist. 
     * @param {Request} Request 
     * @param {int} position 
     * @returns 1 on success, -1 on fail
     */
    initInsert(Request, position) {
        if(position < 0) {
            return -1;
        }
        if(this.#queue[position] === undefined ||this.#queue[position] === null)
        {
            this.#queue[position] = Request;
            this.#queueSize++;
            return 1;
        } else {
            this.#queue.splice(position, 0, Request);
            this.#queueSize++;
            return 1;    
        }
    }

    /**
     * Remove a single Request from the queue based on Request._id 
     * @param {Request} Request 
     * @returns 1 on success, -1 if Request doesn't exist
     */
    delete(Request) {
        const index = this.#queue.indexOf(Request);
        if(index >= 0) {
            this.#queue.splice(index, 1);
            this.#queueSize--;
            return 1;
        } else {
            return -1;
        }
    }

    /**
     * Remove a Request from its current position in the queue and place it in the new position by 
     * calling this class' insert method
     * @param {Request} Request 
     * @param {int} newPos 
     * @returns 1 on success, -1 if Request doesn't exist or newPos is out of bounds of the queue
     */
    move(Request, newPos) {
        if(newPos > this.#queue.length || newPos < 0) {
            return -1;
        }
        const theRequest = Request;
        const index = this.#queue.indexOf(Patient);
        if(index >= 0) {
            this.#queue.splice(index, 1);
            this.#queueSize--;//this is here so that if something goes wrong with re-adding the Request, the queue size remains accurate
            this.insert(theRequest, newPos);
            this.#queueSize++;
            return 1;
        } else {
            return -1;
        }
    }

    printAll() {
        this.#queue.forEach(element => {
            console.log(element._id.toHexString());
        })
    }

    get hospital() {
        return this.#hospital;
    }

    get queueSize() {
        return this.#queueSize;
    }
}