// This will have to change in the future
export function unwrapper(obj: any): object {
    if (typeof obj === "object") {
        if (obj !== undefined && obj != null) {
            return obj[0];
        }
    }
    return obj;
}
