using FinBoard.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinBoard.Domain.Context
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, Guid, IdentityUserClaim<Guid>,
        AppUserRole, IdentityUserLogin<Guid>, IdentityRoleClaim<Guid>, IdentityUserToken<Guid>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
                .HasMany(ur => ur.AppUserRoles)
                .WithOne(u => u.AppUser)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(ur => ur.AppUserRoles)
                .WithOne(u => u.AppRole)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();

            builder.Entity<AppUser>()
            .HasOne(a => a.Account)
            .WithOne(a => a.AppUser)
            .HasForeignKey<Account>(c => c.AppUserId);

            builder.Entity<Account>()
            .HasOne(a => a.AppUser)
            .WithOne(a => a.Account)
            .HasForeignKey<AppUser>(c => c.AccountId);
        }

        DbSet<Account> Accounts { get; set; }
        DbSet<Resource> Resources { get; set; }
        DbSet<ResourceGroup> ResourceGroups { get; set; }
        DbSet<Move> Moves { get; set; }


    }
}
