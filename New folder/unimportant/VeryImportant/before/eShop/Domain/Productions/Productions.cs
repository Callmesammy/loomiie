using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Productions
{
    public class Productions
   
    {
       public Productions(ProductId id, string name, Sku sku, Amount price)
    {
            Id = id;
        Name = name;
        Sku = sku;
        Price = price;
    } 
        
        public ProductId Id { get; private set; }
        public string Name { get; private set; }
        public Sku Sku { get; private set; }
        public Amount Price { get; private set; }
    }
}
