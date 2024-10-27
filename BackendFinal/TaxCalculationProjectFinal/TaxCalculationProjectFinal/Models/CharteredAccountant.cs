using System;
using System.Collections.Generic;

namespace TaxCalculationProjectFinal.Models;

public partial class CharteredAccountant
{
    public int CaId { get; set; }

    public string? CaName { get; set; }

    public string? Email { get; set; }

    public string? Cpassword { get; set; }

    public string? Gender { get; set; }

    public string? CaAddress { get; set; }

    public virtual ICollection<TableInfo> TableInfos { get; set; } = new List<TableInfo>();

    public virtual ICollection<UserDatum> UserData { get; set; } = new List<UserDatum>();
}
