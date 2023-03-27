using DDDSample1.Domain.Users;
using DDDSample1.Domain.Shared;

namespace PrimeService.Tests.TestesUnitarios.Domain.Users
{
    public class RoleTest
    {
        [Fact]
        public void SuccessfullyCreateRole()
        {
            const string role = "Administrador";
            Role result = new Role(role);
            Assert.Equal(role, result.role);
        }  

        [Fact]
        public void FailCreateRoleWithNullValue()
        {
           Assert.Throws<BusinessRuleValidationException>(() => new Role(null));
        }
    }
}