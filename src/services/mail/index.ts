import nodemailer from 'nodemailer'

import { env } from '@/env';
import { NewSquadMemberTemplate } from './templates/new-squad-member';
import { NewMeetingTemplate } from './templates/new-meeting';
import { RecoverPasswordTemplate } from './templates/revocer-password';
import { NewUserSquadAndMemberTemplate } from './templates/new-user-and-squad-member';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: env.MAILER_EMAIL,
    pass: env.MAILER_KEY
  }
})

type TemplateOptions = 'new-squad-member' | 'new-meeting' | 'recover-password' | 'new-user-and-squad-member'
type Sender = {
  email: string;
  name: string
}
export async function SendMail<T>(
  to: Sender,
  from: Sender,
  subject: string,
  template: TemplateOptions,
  templateData: T,
) {
  let templateHtml = ''

  if (template === 'new-squad-member') {
    const data = templateData as MailTypes.NewSquadMember.Data
    templateHtml = NewSquadMemberTemplate(data.squadName, data.url)
  }

  if (template === 'new-user-and-squad-member') {
    const data = templateData as MailTypes.NewSquadMember.Data
    templateHtml = NewUserSquadAndMemberTemplate(data.squadName, data.url)
  }

  if (template === 'new-meeting') {
    const data = templateData as MailTypes.NewMeeting.Data
    templateHtml = NewMeetingTemplate(data.squadName, data.date, data.url)
  }

  if (template === 'recover-password') {
    const data = templateData as { url: string }
    templateHtml = RecoverPasswordTemplate(data.url)
  }

  try {
    await transporter.sendMail({
      from: from.email,
      to: to.email,
      subject,
      html: templateHtml
    })

  } catch (error) {
    console.log(error)
  }

}