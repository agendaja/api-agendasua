import { IntegrationsRepository } from "@/repositories/integrations-repository";
import { GoogleIntegrationDataRepository } from "@/repositories/google-integration-data-repository";

interface CreateIntegrationServiceRequest {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  expiry_date: number;
  name: 'google' | 'zoom';
  user_id: string;
}

export class CreateIntegrationService {
  constructor(
    private integrationsRepository: IntegrationsRepository,
    private googleIntegrationDataRepository: GoogleIntegrationDataRepository
  ) { }

  async execute({ access_token, refresh_token, scope, token_type, expiry_date, name, user_id }: CreateIntegrationServiceRequest) {

    const existingIntegration = await this.integrationsRepository.findByUserId(user_id, name)

    if (existingIntegration) {
      await this.integrationsRepository.delete(existingIntegration.id, user_id)
    }

    const newIntegration = await this.integrationsRepository.create({
      name,
      user_id
    })

    if (name === 'google') {
      await this.googleIntegrationDataRepository.create({
        access_token,
        refresh_token,
        scope,
        token_type,
        expiry_date,
        integration_id: newIntegration.id,
      })
    }
  }
}