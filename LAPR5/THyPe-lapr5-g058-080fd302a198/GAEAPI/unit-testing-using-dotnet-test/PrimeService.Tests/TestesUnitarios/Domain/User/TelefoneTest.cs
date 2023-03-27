using DDDSample1.Domain.Users;
using DDDSample1.Domain.Shared;

namespace PrimeService.Tests.TestesUnitarios.Domain.Users
{
    public class TelefoneTest
    {
        [Fact]
        public void SuccessfullyCreateTelefone()
        {
            Telefone result = new Telefone(933123444);
            Assert.NotNull(result.telefone);
        }
      
        [Fact]
        public void FailToCreateTelefone()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new Telefone(933));
        }
    }
}