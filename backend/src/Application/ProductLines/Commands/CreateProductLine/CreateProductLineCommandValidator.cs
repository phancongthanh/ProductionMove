﻿using FluentValidation;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Interfaces;

namespace ProductionMove.Application.ProductLines.Commands.CreateProductLine;
public class CreateProductLineCommandValidator : AbstractValidator<CreateProductLineCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateProductLineCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(request => request.ProductLine.Name).MustAsync(IsNotExisted).WithMessage("Tên dòng sản phẩm đã có!");

        RuleFor(request => request.ProductLine.WarrantyPeriod).GreaterThan(0).WithMessage("Thời gian bảo hành không hợp lệ!");
    }

    private async Task<bool> IsNotExisted(string name, CancellationToken cancellationToken = default)
     => !await _context.ProductLines.AnyAsync(pl => pl.Name == name, cancellationToken);
}
