import { Request } from "koa";

class Health {
  public check = () => {
    return `
      <h1
        style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
      >
        I am OK ( ͡°╭͜ʖ╮͡° )
      </h1>
    `
  }
}

export default new Health()