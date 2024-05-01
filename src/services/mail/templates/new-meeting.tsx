export const NewMeetingTemplate = (name: string, date: Date, url?: string) => {

  return ` 
  <p>Você agendou um horário com a equipe:</p>
  <h2>${name}</h2>

  <p>Sua reunião ocorrerá ${date}</p>
  <p>Acesse a reunião pelo link abaixo:</p>

  <a href="${url}" target="_blank">Clique aqui</a>

`
}