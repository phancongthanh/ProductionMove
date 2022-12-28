namespace ProductionMove.Application.Common.Models;

public interface ProductStatisticsItem<T> where T : ProductStatisticsItem<T>
{
    T Add(T value);
}

public class MonthProductStatistics<T> where T : ProductStatisticsItem<T>
{
    public int Year { get; }

    public int Quarter => Month / 3;

    public int Month { get; }

    public T Value { get; }

    public MonthProductStatistics(int year, int month, T value)
    {
        Year = year;
        Month = month;
        Value = value;
    }
}

public class QuarterProductStatistics<T> where T : ProductStatisticsItem<T>
{
    public int Year { get; }

    public int Quarter { get; }

    public T Value
    {
        get
        {
            T result = MonthStatistics.First().Value;
            foreach (var s in MonthStatistics.Skip(1)) result = result.Add(s.Value);
            return result;
        }
    }

    public IEnumerable<MonthProductStatistics<T>> MonthStatistics { get; }

    public QuarterProductStatistics(int year, int quarter, IEnumerable<MonthProductStatistics<T>> monthStatistics)
    {
        Year = year;
        Quarter = quarter;
        MonthStatistics = monthStatistics
            .Where(s => s.Year == year && s.Quarter == quarter)
            .OrderBy(s => s.Month);
    }
}

public class YearProductStatistics<T> where T : ProductStatisticsItem<T>
{
    public int Year { get; }

    public T Value
    {
        get
        {
            T result = QuarterStatistics.First().Value;
            foreach (var s in QuarterStatistics.Skip(1)) result = result.Add(s.Value);
            return result;
        }
    }

    public IEnumerable<QuarterProductStatistics<T>> QuarterStatistics { get; }

    public IEnumerable<MonthProductStatistics<T>> MonthStatistics => QuarterStatistics.SelectMany(s => s.MonthStatistics).OrderBy(s => s.Month);

    public YearProductStatistics(int year, IEnumerable<MonthProductStatistics<T>> monthStatistics)
    {
        Year = year;
        QuarterStatistics = monthStatistics
            .Where(s => s.Year == year)
            .GroupBy(
                s => s.Quarter,
                s => s,
                (quarter, s) => new QuarterProductStatistics<T>(year, quarter, s.Where(_s => _s.Quarter == quarter))
            )
            .OrderBy(s => s.Quarter);
    }
}

public class ProductStatistics<T> where T : ProductStatisticsItem<T>
{
    public IEnumerable<YearProductStatistics<T>> YearStatistics { get; }

    public IEnumerable<QuarterProductStatistics<T>> QuarterStatistics => YearStatistics.SelectMany(s => s.QuarterStatistics).OrderBy(s => s.Year).ThenBy(s => s.Quarter);

    public IEnumerable<MonthProductStatistics<T>> MonthStatistics => YearStatistics.SelectMany(s => s.MonthStatistics).OrderBy(s => s.Year).ThenBy(s => s.Month);

    public ProductStatistics(IEnumerable<MonthProductStatistics<T>> monthStatistics)
    {
        YearStatistics = monthStatistics
            .GroupBy(
                s => s.Year,
                s => s,
                (year, s) => new YearProductStatistics<T>(year, s.Where(_s => _s.Year == year))
            )
            .OrderBy(s => s.Year);
    }
}
