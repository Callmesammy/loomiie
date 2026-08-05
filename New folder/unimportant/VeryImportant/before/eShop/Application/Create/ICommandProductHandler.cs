using Domain.Productions;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Application.Create
{
    internal class ICommandProductHandler : IRequestHandler<ICommandProductCommand>
    {
        private readonly IProductReporsitory _productReporsitory;

        public ICommandProductHandler(IProductReporsitory productReporsitory)
        {
            _productReporsitory = productReporsitory;
        }

        public Task Handle(ICommandProductCommand request, CancellationToken cancellationToken)
        {
            var productions = new Productions(new ProductId(Guid.NewGuid()),
                request.Name,
                new Amount(request.Price, request.Currency),
                new Sku(request.Sku())
        }
    }
}
