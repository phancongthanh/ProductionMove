namespace ProductionMove.Application.Common.Models;

public class MonthAnalysis
{
    public int Year { get; }

    public int Quarter => Month / 4;

    public int Month { get; }

    public int PreviousValue { get; }

    public int Value { get; }

    public float Percentage => PreviousValue <= 0 ? 0 : 100f * Value / PreviousValue;

    public MonthAnalysis(int year, int month, int previousValue, int value)
    {
        Year = year;
        Month = month;
        PreviousValue = previousValue;
        Value = value;
    }
}

public class QuarterAnalysis
{
    public int Year { get; }

    public int Quarter { get; }

    public int PreviousValue { get; }

    public int Value { get; }

    public float Percentage => PreviousValue <= 0 ? 0 : 100f * Value / PreviousValue;

    public QuarterAnalysis(int year, int quarter, int previousValue, int value)
    {
        Year = year;
        Quarter = quarter;
        PreviousValue = previousValue;
        Value = value;
    }
}

public class YearAnalysis
{
    public int Year { get; }

    public int PreviousValue { get; }

    public int Value { get; }

    public float Percentage => PreviousValue <= 0 ? 0 : 100f * Value / PreviousValue;

    public YearAnalysis(int year, int previousValue, int value)
    {
        Year = year;
        PreviousValue = previousValue;
        Value = value;
    }
}

public class ProductAnalysis
{
    public List<MonthAnalysis> MonthAnalysis { get; set; } = new List<MonthAnalysis>();

    public List<QuarterAnalysis> QuarterAnalyses { get; set; } = new List<QuarterAnalysis>();

    public List<YearAnalysis> YearAnalyses { get; set; } = new List<YearAnalysis>();
}
