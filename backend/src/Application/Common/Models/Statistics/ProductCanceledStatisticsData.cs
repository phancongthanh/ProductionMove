namespace ProductionMove.Application.Common.Models.Statistics;

public class ProductCanceledStatisticsData
{
    public class ProductLineProductCanceled
    {
        public string ProductLineId { get; }

        public int CanceledCount { get; } = 0;

        public int TotalCount { get; } = 0;

        public float CanceledRate { get; } = 0;

        public ProductLineProductCanceled(string productLineId, int canceledCount, int totalCount)
        {
            ProductLineId = productLineId;
            CanceledCount = canceledCount;
            TotalCount = totalCount;
            if (totalCount > 0) CanceledRate = 1.0f * canceledCount / totalCount;
        }
    }

    public class DistributorProductCanceled
    {
        public string DistributorId { get; }

        public IEnumerable<ProductLineProductCanceled> ProductLines { get; }

        public DistributorProductCanceled(string distributorId, IEnumerable<ProductLineProductCanceled> productLines)
        {
            DistributorId = distributorId;
            ProductLines = productLines;
        }
    }

    public IList<DistributorProductCanceled> Distributors { get; } = new List<DistributorProductCanceled>();
}
