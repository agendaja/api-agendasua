import nodemailer from 'nodemailer'
import { NewSquadMemberTemplate } from './templates/new-squad-member';
import { NewMeetingTemplate } from './templates/new-meeting';
import { RecoverPasswordTemplate } from './templates/recover-password';
import { env } from '@/env';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: env.MAILER_EMAIL,
    pass: env.MAILER_KEY
  }
})

type TemplateOptions = 'new-squad-member' | 'new-meeting' | 'recover-password'
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

    return true
  } catch (error) {
    console.log(error)
    return false
  }

}