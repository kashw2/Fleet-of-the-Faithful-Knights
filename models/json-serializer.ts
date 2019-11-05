export abstract class JsonSerializer<A> {

    abstract fromJson(obj: any): A;

}
