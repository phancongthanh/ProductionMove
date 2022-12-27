using FluentValidation;

namespace ProductionMove.Application.Products.Queries.GetProducts;

public class GetProductsQueryValidator : AbstractValidator<GetProductsQuery>
{
    public GetProductsQueryValidator()
    {
        RuleFor(request => request.PageNumber).GreaterThan(0).WithMessage("Số trang phải lớn hơn 0!");

        RuleFor(request => request.PageSize).GreaterThan(0).WithMessage("Số phần tử của trang phải lớn hơn 0");
    }
}
