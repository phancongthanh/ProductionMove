using ProductionMove.Application.Common.Models;

namespace ProductionMove.Application.Common.Interfaces;
public interface ITokenProvider
{
    string GenerateRefreshToken(User user, string tokenId);

    string GenerateAccessToken(User user, string tokenId);
}
