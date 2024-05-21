export const NewUserSquadAndMemberTemplate = (name: string, url: string) => {

  return ` 
  <p>Você foi convidado a participar da equipe:</p>
  <h2>${name}</h2>

  <p>Clique no link abaixo, crie a sua conta e confirme a seu cadastro na equipe!</p>

  <a href="${url}" target="_blank">Clique aqui</a>

`
}