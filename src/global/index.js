import registerEle from './register-ele'

export function globalRegister(app) {
  app.use(registerEle)
}
