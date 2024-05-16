import { IntegrationsRepository } from "@/repositories/integrations-repository";
import { GoogleIntegrationDataRepository } from "@/repositories/google-integration-data-repository";

interface CreateIntegrationServiceRequest {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  expiry_date: number;
  name: 'google' | 'zoom';
  email: string;
}

export class CreateIntegrationService {
  constructor(
    private integrationsRepository: IntegrationsRepository,
    private googleIntegrationDataRepository: GoogleIntegrationDataRepository
  ) { }

  async execute({ access_token, refresh_token, scope, token_type, expiry_date, name, email }: CreateIntegrationServiceRequest) {

    const existingIntegration = await this.integrationsRepository.findByUserEmail(email, name)

    if (existingIntegration) {
      await this.integrationsRepository.delete(existingIntegration.id)
    }

    const newIntegration = await this.integrationsRepository.create({
      name,
      user_email: email
    })

    if (name === 'google') {
      await this.googleIntegrationDataRepository.create({
        access_token,
        refresh_token,
        scope,
        token_type,
        expiry_date,
        integration_id: newIntegration.id,
        email
      })
    }
  }
}