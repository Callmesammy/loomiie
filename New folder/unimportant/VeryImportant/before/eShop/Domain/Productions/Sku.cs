using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Productions
{
    public record Sku
    {
        private const int DefaultLength = 8;
        private Sku(string value) => value = value;
        public string  value {get; init;}
        public static Sku? Create(string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                return null;
            }
            if(value.Length != DefaultLength)
            {
                return null;
            }
        return new Sku(value);

        }
    }
}
