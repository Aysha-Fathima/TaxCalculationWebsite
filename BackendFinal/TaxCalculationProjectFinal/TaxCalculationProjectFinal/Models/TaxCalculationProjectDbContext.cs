using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TaxCalculationProjectFinal.Models;

public partial class TaxCalculationProjectDbContext : DbContext
{
    public TaxCalculationProjectDbContext()
    {
    }

    public TaxCalculationProjectDbContext(DbContextOptions<TaxCalculationProjectDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CharteredAccountant> CharteredAccountants { get; set; }

    public virtual DbSet<TableInfo> TableInfos { get; set; }

    public virtual DbSet<UserDatum> UserData { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("server=550FEA1D28E459A;database=TaxCalculationProjectDB;integrated security=true;TrustServerCertificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CharteredAccountant>(entity =>
        {
            entity.HasKey(e => e.CaId).HasName("PK__chartere__21BDC49E1410D4FF");

            entity.ToTable("charteredAccountant");

            entity.Property(e => e.CaId).HasColumnName("caId");
            entity.Property(e => e.CaAddress)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("caAddress");
            entity.Property(e => e.CaName)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("caName");
            entity.Property(e => e.Cpassword)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("cpassword");
            entity.Property(e => e.Email)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Gender)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("gender");
        });

        modelBuilder.Entity<TableInfo>(entity =>
        {
            entity.HasKey(e => e.TaxId).HasName("PK__tableInf__24D28839EA4358FC");

            entity.ToTable("tableInfo");

            entity.Property(e => e.TaxId).HasColumnName("taxId");
            entity.Property(e => e.Age)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("age");
            entity.Property(e => e.AssessmentYear)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("assessmentYear");
            entity.Property(e => e.CaId).HasColumnName("caId");
            entity.Property(e => e.NewRegimeTax).HasColumnName("newRegimeTax");
            entity.Property(e => e.OldRegimeTax).HasColumnName("oldRegimeTax");
            entity.Property(e => e.TotalAnnualIncome).HasColumnName("totalAnnualIncome");
            entity.Property(e => e.TotalDeductions).HasColumnName("totalDeductions");
            entity.Property(e => e.UserId).HasColumnName("userId");

            entity.HasOne(d => d.Ca).WithMany(p => p.TableInfos)
                .HasForeignKey(d => d.CaId)
                .HasConstraintName("FK__tableInfo__caId__45F365D3");

            entity.HasOne(d => d.User).WithMany(p => p.TableInfos)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__tableInfo__userI__44FF419A");
        });

        modelBuilder.Entity<UserDatum>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__userData__CB9A1CFF84550B49");

            entity.ToTable("userData", tb => tb.HasTrigger("trgAssignRandomCaId"));

            entity.Property(e => e.UserId).HasColumnName("userId");
            entity.Property(e => e.CaId).HasColumnName("caId");
            entity.Property(e => e.Email)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Gender)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("gender");
            entity.Property(e => e.Upassword)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("upassword");
            entity.Property(e => e.UserAddress)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("userAddress");
            entity.Property(e => e.UserName)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("userName");

            entity.HasOne(d => d.Ca).WithMany(p => p.UserData)
                .HasForeignKey(d => d.CaId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__userData__caId__398D8EEE");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
