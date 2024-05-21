
import { IntegrationsRepository } from '@/repositories/integrations-repository';
import { oauth2Client } from './oAuthClietnt';
import { GoogleIntegrationDataRepository } from '@/repositories/google-integration-data-repository';

export async function getOAuth2Client(
  userId: string,
  integrationsRepository: IntegrationsRepository,
  googleIntegrationDataRepository: GoogleIntegrationDataRepository
) {

  const integration = await integrationsRepository.findByUserId(userId, 'google', true);

  if (!integration) {
    throw new Error('No integration found for the user');
  }

  oauth2Client.setCredentials({
    access_token: integration.googleIntegration?.access_token,
    refresh_token: integration.googleIntegration?.refresh_token,
    scope: integration.googleIntegration?.scope,
    token_type: integration.googleIntegration?.token_type,
    expiry_date: Number(integration.googleIntegration?.expiry_date),
  });

  // Verifica se o token de acesso está expirado e renova se necessário
  const now = Date.now();
  if (!integration.googleIntegration?.expiry_date || integration.googleIntegration?.expiry_date <= now) {
    const newTokens = await oauth2Client.refreshAccessToken();
    oauth2Client.setCredentials(newTokens.credentials);

    // Atualiza o banco de dados com os novos tokens se rotornados, caso contrário preserva os antigos
    await googleIntegrationDataRepository.update({
      access_token: newTokens.credentials.access_token || integration.googleIntegration?.access_token,
      refresh_token: newTokens.credentials.refresh_token || integration.googleIntegration?.refresh_token,
      scope: newTokens.credentials.scope,
      token_type: newTokens.credentials.token_type || integration.googleIntegration?.token_type,
      expiry_date: newTokens.credentials.expiry_date || integration.googleIntegration?.expiry_date,
    },
      integration.id
    );
  }

  return oauth2Client;
}
