using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Create
{
    public record  ICommandProductCommand(string Name,
        string Sku,
        string Currency,
        decimal Price) :IRequest
    {
    }
}
