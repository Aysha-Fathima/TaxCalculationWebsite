using System;
using System.Collections.Generic;

namespace TaxCalculationProjectFinal.Models;

public partial class UserDatum
{
    public int UserId { get; set; }

    public int? CaId { get; set; }

    public string? UserName { get; set; }

    public string? Gender { get; set; }

    public string? Email { get; set; }

    public string? UserAddress { get; set; }

    public string? Upassword { get; set; }

    public virtual CharteredAccountant? Ca { get; set; }

    public virtual ICollection<TableInfo> TableInfos { get; set; } = new List<TableInfo>();
}
