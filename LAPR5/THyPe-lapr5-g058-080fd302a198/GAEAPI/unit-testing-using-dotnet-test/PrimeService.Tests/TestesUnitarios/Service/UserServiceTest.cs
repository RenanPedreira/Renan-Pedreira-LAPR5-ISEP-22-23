using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Users;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace PrimeService.Tests.TestesUnitarios.Domain.Users {
    public class UserServiceTest {
        
        private readonly UserService _service;
        private readonly Mock<IUnitOfWork> _unit;
        private readonly Mock<IUserRepository> _repo;
        private CreatingUserDto cdto;
        private UserDto dto;
        private User user;
        
        public UserServiceTest(){
            _unit = new Mock<IUnitOfWork>();
            _repo = new Mock<IUserRepository>();
            _service = new UserService(_unit.Object, _repo.Object);

            cdto = new CreatingUserDto("Miguel", "Administrador", 933111222, "miguel12@gmail.com", "souBunito123");
            dto = new UserDto(Guid.NewGuid(), "Miguel", "Administrador", 933111222, "miguel12@gmail.com", "souBunito123");
            user = new User("Miguel", "Administrador", 933111222, "miguel12@gmail.com", "souBunito123");
        }

        [Fact]
        public void GetAllAsyncTest(){
            var list = new List<User>();
            list.Add(new User("Miguel", "Administrador", 933111222, "miguel12@gmail.com", "souBunito123"));
            _repo.Setup(user => user.GetAllAsync()).ReturnsAsync(list);
            var result = _service.GetAllAsync();
            
            List<UserDto> resultDTO = list.ConvertAll<UserDto>(user => 
                new UserDto(user.Id.AsGuid(), user._Nome.nome, user._Role.role, user._Telefone.telefone, user._Email.email, user._Password.password)); 
               
            Assert.Equal(resultDTO.ToString(), result.Result.ToString());
        }

        [Fact]
        public void GetByIdAsyncTest(){
            User _user = new User("Miguel", "Administrador", 933111222, "miguel12@gmail.com", "souBunito123");

            _repo.Setup(user => user.GetByIdAsync(_user.Id)).ReturnsAsync(_user);
            var result = _service.GetByIdAsync(_user.Id);
            UserDto userDto = new UserDto(_user.Id.AsGuid(), _user._Nome.nome, _user._Role.role, _user._Telefone.telefone, _user._Email.email, _user._Password.password);

            Assert.Equal(result.Result.ToString(), userDto.ToString());
        }

        [Fact]
        public void GetByIdTestNull(){
            _repo.Setup(user => user.GetByIdAsync(It.IsAny<UserId>())).ReturnsAsync(() => null);
            var result =  _service.GetByIdAsync(new UserId(new Guid()));
            Assert.Null(result.Result);
        }

        [Fact]
        public async void ThrowBusinessRuleExceptionWhenDataIsInvalid()
        {
            CreatingUserDto dto = new CreatingUserDto("", "", -1, "", "");
            await Assert.ThrowsAsync<BusinessRuleValidationException>(() => _service.RegisterUser(dto));
        }

        [Fact]
        public async void ReturnNotNullObjectWhenUserIsRegisteredSuccessfully()
        {
            _repo.Setup(x => x.AddAsync(It.IsAny<User>())).Returns(Task.FromResult<User>(user));
            var res = await _service.RegisterUser(cdto);
            Assert.NotNull(res);
        }

        [Fact]
        public async void ThrowDbUpdateExceptionWhenUserIsAlreadyRegistered()
        {
            _repo.Setup(x => x.AddAsync(It.IsAny<User>())).Returns(Task.FromResult<User>(user));
            await _service.RegisterUser(cdto);
            _repo.Setup(x => x.AddAsync(It.IsAny<User>())).Throws(new DbUpdateException());
            await Assert.ThrowsAsync<DbUpdateException>(() => _service.RegisterUser(cdto));
        } 
    }
}