using FinBoard.Domain.Context;
using FinBoard.Domain.Entities;
using FinBoard.Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedData(UserManager<AppUser> userManager, DataContext context)
        {
            context.Database.EnsureDeleted();
            context.Database.Migrate();

            var userId = Guid.NewGuid();
            var accountId = Guid.NewGuid();
            var now = DateTime.Now;

            var user = new AppUser
            {
                Id = userId,
                UserName = "test",
                Email = "test@test.sk",
                CreatedBy = userId,
                LastModifyBy = userId,
                DateOfCreation = now,
                DateOfLastModification = now
            };

            await userManager.CreateAsync(user, "password123456");

            var account = new Account
            {
                AccountId = accountId,
                AppUserId = userId,
                DateOfFirstSnapshot = now.AddMonths(-30),
                PeriodicityOfSnapshotsInDays = 30,
                CreatedBy = userId,
                LastModifyBy = userId,
                DateOfCreation = now,
                DateOfLastModification = now
            };

            context.Accounts.Add(account);
            await context.SaveChangesAsync();

            user.AccountId = accountId;
            await userManager.UpdateAsync(user);

            // Resources
            var savings = CreateResource("Savings Account", Currency.EUR, accountId, userId, now);
            var stocks = CreateResource("Stock Portfolio", Currency.USD, accountId, userId, now);
            var bonds = CreateResource("Government Bonds", Currency.EUR, accountId, userId, now);
            var crypto = CreateResource("Crypto Wallet", Currency.USD, accountId, userId, now);
            var realEstate = CreateResource("Real Estate Fund", Currency.EUR, accountId, userId, now);

            context.Resources.AddRange(savings, stocks, bonds, crypto, realEstate);
            await context.SaveChangesAsync();

            // Resource Groups
            var retirementGroup = new ResourceGroup
            {
                ResourceGroupId = Guid.NewGuid(),
                AccountId = accountId,
                ResourceGroupName = "Retirement",
                Resources = new List<Resource> { savings, bonds, stocks },
                CreatedBy = userId,
                LastModifyBy = userId,
                DateOfCreation = now,
                DateOfLastModification = now
            };

            var complexGroup = new ResourceGroup
            {
                ResourceGroupId = Guid.NewGuid(),
                AccountId = accountId,
                ResourceGroupName = "Complex",
                Resources = new List<Resource> { savings, stocks, bonds, crypto, realEstate },
                CreatedBy = userId,
                LastModifyBy = userId,
                DateOfCreation = now,
                DateOfLastModification = now
            };

            context.ResourceGroups.AddRange(retirementGroup, complexGroup);
            await context.SaveChangesAsync();

            // Snapshots – 30 months of monthly data for each resource
            var snapshots = new List<Snapshot>();
            var rng = new Random(42);

            snapshots.AddRange(GenerateSnapshots(savings.ResourceId, accountId, userId, now, 5000f, 50f, rng));
            snapshots.AddRange(GenerateSnapshots(stocks.ResourceId, accountId, userId, now, 10000f, 500f, rng));
            snapshots.AddRange(GenerateSnapshots(bonds.ResourceId, accountId, userId, now, 8000f, 100f, rng));
            snapshots.AddRange(GenerateSnapshots(crypto.ResourceId, accountId, userId, now, 3000f, 800f, rng));
            snapshots.AddRange(GenerateSnapshots(realEstate.ResourceId, accountId, userId, now, 20000f, 300f, rng));

            context.Snapshots.AddRange(snapshots);
            await context.SaveChangesAsync();
        }

        private static Resource CreateResource(string name, Currency currency, Guid accountId, Guid userId, DateTime now)
        {
            return new Resource
            {
                ResourceId = Guid.NewGuid(),
                AccountId = accountId,
                Name = name,
                Currency = currency,
                CreatedBy = userId,
                LastModifyBy = userId,
                DateOfCreation = now,
                DateOfLastModification = now
            };
        }

        private static List<Snapshot> GenerateSnapshots(
            Guid resourceId, Guid accountId, Guid userId, DateTime now,
            float startAmount, float volatility, Random rng)
        {
            var snapshots = new List<Snapshot>();
            var amount = startAmount;

            for (int i = 30; i >= 1; i--)
            {
                var date = now.AddMonths(-i);
                amount += (float)(rng.NextDouble() * 2 - 1) * volatility + volatility * 0.1f;
                if (amount < 0) amount = 100f;

                snapshots.Add(new Snapshot
                {
                    SnapshotId = Guid.NewGuid(),
                    ResourceId = resourceId,
                    AccountId = accountId,
                    Amount = (float)Math.Round(amount, 2),
                    DateOfSnapshot = date,
                    CreatedBy = userId,
                    LastModifyBy = userId,
                    DateOfCreation = now,
                    DateOfLastModification = now
                });
            }

            return snapshots;
        }
    }
}
