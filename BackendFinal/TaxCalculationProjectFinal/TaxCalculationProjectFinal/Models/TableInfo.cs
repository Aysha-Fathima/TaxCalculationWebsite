using System;
using System.Collections.Generic;

namespace TaxCalculationProjectFinal.Models;

public partial class TableInfo
{
    public int TaxId { get; set; }

    public int? UserId { get; set; }

    public int? CaId { get; set; }

    public string? AssessmentYear { get; set; }

    public string? Age { get; set; }

    public double? TotalAnnualIncome { get; set; }

    public double? TotalDeductions { get; set; }

    public double? OldRegimeTax { get; set; }

    public double? NewRegimeTax { get; set; }

    public virtual CharteredAccountant? Ca { get; set; }

    public virtual UserDatum? User { get; set; }
}
