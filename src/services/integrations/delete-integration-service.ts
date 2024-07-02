import { IntegrationsRepository } from "@/repositories/integrations-repository";

interface DeleteIntegrationServiceRequest {
  integration_id: string;
  user_id: string;
}

export class DeleteIntegrationService {
  constructor(
    private integrationsRepository: IntegrationsRepository,
  ) { }

  async execute({ integration_id, user_id }: DeleteIntegrationServiceRequest) {

    await this.integrationsRepository.delete(integration_id, user_id)

  }
}