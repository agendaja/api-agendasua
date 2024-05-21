export const NewSquadMemberTemplate = (name: string, url: string) => {

  return ` 
  <p>Você foi convidado a participar da equipe:</p>
  <h2>${name}</h2>

  <p>Clique no link e confirme a sua conta!</p>

  <a href="${url}" target="_blank">Clique aqui</a>

`
}