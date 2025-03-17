using Azure.Identity;
using Microsoft.Graph;

public static class GraphHelper
{
    private static GraphServiceClient? _graphClient;

    public static GraphServiceClient GetGraphClient()
    {
        if (_graphClient is not null)
            return _graphClient;

        var scopes = new[] { "User.Read", "Calendars.Read" };
        var tenantId = "0bd66e42-d830-4cdc-b580-f835a405d038";
        var clientId = "5e381e57-3c53-442b-b370-7d739e4a0a5a";

        var options = new DeviceCodeCredentialOptions
        {
            AuthorityHost = AzureAuthorityHosts.AzurePublicCloud,
            ClientId = clientId,
            TenantId = tenantId,
            DeviceCodeCallback = (code, cancellation) =>
            {
                Console.WriteLine(code.Message);
                return Task.CompletedTask;
            },
        };

        var deviceCodeCredential = new DeviceCodeCredential(options);
        _graphClient = new GraphServiceClient(deviceCodeCredential, scopes);
        return _graphClient;
    }
}
