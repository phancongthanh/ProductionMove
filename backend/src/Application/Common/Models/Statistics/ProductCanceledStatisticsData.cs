namespace ProductionMove.Application.Common.Models.Statistics;

public class ProductCanceledStatisticsData
{
    /*
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
    */
    public class ProductLineProductCanceled
    {
        public string ProductLineId { get; }

        public IList<float> DistributorRates { get; set; } = new List<float>();

        public ProductLineProductCanceled(string productLine)
        {
            ProductLineId = productLine;
        }
    }

    public IList<DistributorModel> Distributors { get; set; } = new List<DistributorModel>();

    public IList<ProductLineProductCanceled> ProductLines { get; set; } = new List<ProductLineProductCanceled>();
}
