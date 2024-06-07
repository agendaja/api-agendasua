import { IntegrationsRepository } from "@/repositories/integrations-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetIntegrationServiceRequest {
  name: 'google' | 'zoom';
  user_id: string;
}

export class GetIntegrationService {
  constructor(
    private integrationsRepository: IntegrationsRepository,
  ) { }

  async execute({ name, user_id }: GetIntegrationServiceRequest) {

    const existingIntegration = await this.integrationsRepository.findByUserId(user_id, name)

    if (!existingIntegration) {
      throw new ResourceNotFoundError()
    }

    return { integration: existingIntegration }
  }
}