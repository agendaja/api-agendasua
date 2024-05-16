import { IntegrationsRepository } from "@/repositories/integrations-repository";
import { GoogleIntegrationDataRepository } from "@/repositories/google-integration-data-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetIntegrationServiceRequest {
  name: 'google' | 'zoom';
  email: string;
}

export class GetIntegrationService {
  constructor(
    private integrationsRepository: IntegrationsRepository,
    private googleIntegrationData: GoogleIntegrationDataRepository
  ) { }

  async execute({ name, email }: GetIntegrationServiceRequest) {

    const existingIntegration = await this.integrationsRepository.findByUserEmail(email, name)

    if (!existingIntegration) {
      throw new ResourceNotFoundError()
    }

    return { integration: existingIntegration }
  }
}