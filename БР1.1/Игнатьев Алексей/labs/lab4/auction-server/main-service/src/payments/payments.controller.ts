import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { JwtUserPayloadDto } from 'src/auth/dto/jwt.dto';
import { StatusOKDto } from 'src/common/dto/status.dto';
import {
  TransactionEntity,
  TransactionResponseEntity,
} from './entities/transaction.entity';
import {
  CreateInvoiceCallbackDto,
  CreateInvoiceDto,
} from './dto/create-invoice.dto';
import { PaginateParams } from 'src/common/params/pagination.params.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: TransactionResponseEntity })
  @Get()
  async getTransactions(
    @Query() params: PaginateParams,
    @Request() req: { user: JwtUserPayloadDto },
  ): Promise<TransactionResponseEntity> {
    return await this.paymentsService.findAll(req.user.id, params);
  }

  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard)
  @Post('create-invoice')
  async createInvoice(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @Request() req: { user: JwtUserPayloadDto },
  ): Promise<TransactionEntity> {
    return await this.paymentsService.createInvoice(
      createInvoiceDto,
      req.user.id,
    );
  }

  @Post('create-invoice-callback')
  async createInvoiceCallback(
    @Body() createInvoiceCallbackDto: CreateInvoiceCallbackDto,
  ): Promise<StatusOKDto> {
    await this.paymentsService.createInvoiceCallback(
      createInvoiceCallbackDto.invoice_id,
    );
    return new StatusOKDto();
  }
}
