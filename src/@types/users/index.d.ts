declare namespace Users {

  export type PreRegister = {
    name: string;
    email: string;
    squad_id: string;
    token: string;
    user_id?: string;
  }
}