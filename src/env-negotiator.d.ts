declare module 'negotiator' {
  interface Headers {
    [key: string]: string | string[] | undefined;
  }

  class Negotiator {
    constructor(req: { headers: Headers });
    languages(availableLanguages?: string[]): string[];
  }

  export default Negotiator;
}
