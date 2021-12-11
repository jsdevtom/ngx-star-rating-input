import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'ngx-star-rating-input',
  templateUrl: './ngx-star-rating-input.component.html',
  styleUrls: ['./ngx-star-rating-input.component.scss']
})
export class NgxStarRatingInputComponent implements OnInit, AfterViewInit, OnDestroy {

  public readonly componentId = (Math.random() + 1).toString(36).substring(7);
  public isSelecting = false;
  public maxAsArray: number[] | undefined;
  public readonly formControl = new FormControl();
  public hoveredValue: number = 0;
  private _userDefinedAllowedValues: number[] | undefined = undefined;

  @Input() public precision: 1 | 0.5 = 1;
  @Input() public fullIcon: TemplateRef<any> | null = null;
  @Input() public halfIcon: TemplateRef<any> | null = null;
  @Input() public emptyIcon: TemplateRef<any> | null = null;
  @ViewChild('starsContainer', {static: true}) starsContainer: ElementRef<HTMLDivElement> | undefined;

  private boundingClientRectCache = new WeakMap<HTMLSpanElement, DOMRect>();
  private resizeObserver: ResizeObserver | undefined;

  constructor() {
  }

  private _max = 5;

  get max(): number {
    return this._max;
  }

  @Input()
  set max(value: number) {
    this._max = value;

    this.maxAsArray = this.getMaxAsArray(value);

    if (!this._userDefinedAllowedValues) {
      this.allowedValues = this.getDefaultAllowedValues(value);
    }
  }

  private _allowedValues: number[] = []

  get allowedValues(): number[] {
    return this._allowedValues;
  }

  @Input()
  set allowedValues(value: number[]) {
    this._userDefinedAllowedValues = value;
    this._allowedValues = value;
  }

  ngOnInit(): void {
    this.maxAsArray = this.getMaxAsArray(this.max);
    this.allowedValues = this.getDefaultAllowedValues(this.max);
  }

  setHoveredValue(value: number) {
    console.debug('this.hoveredValue: ', this.hoveredValue);
    this.hoveredValue = value;
  }

  onMouseOverStar(event: MouseEvent, value: number) {
    if (this.precision === 1) {
      this.setHoveredValue(value);
    }

    const span = event.currentTarget as HTMLSpanElement;
    const boundingClientRect = this.getBoundingClientRect(span);
    const centerOfStarX = boundingClientRect.x + (boundingClientRect.width / 2);

    const isMouseInLeftHalf = event.x < centerOfStarX;

    if (isMouseInLeftHalf) {
      this.setHoveredValue(value - 0.5);
    } else {
      this.setHoveredValue(value);
    }
  }

  public onMouseLeave() {
    this.isSelecting = false;
  }

  public onMouseEnter() {
    this.isSelecting = true;
  }

  public ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(this.invalidateBoundingRectCache.bind(this));

    if (this.starsContainer === undefined) {
      throw new RangeError('starsContainer not defined');
    }

    this.resizeObserver.observe(this.starsContainer.nativeElement, {});
  }

  public ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  public invalidateBoundingRectCache(): void {
    console.log('invalidating cache');
    this.boundingClientRectCache = new WeakMap<HTMLSpanElement, DOMRect>();
  }

  private getDefaultAllowedValues(max: number): number[] {
    return Array.from({length: max / this.precision}).map((_, i) => (i + 1) * this.precision);
  }

  private getMaxAsArray(max: number): number[] {
    return Array.from({length: max}).map((_, i) => i + 1);
  }

  private getBoundingClientRect(span: HTMLSpanElement): DOMRect {
    const cachedBoundingClientRect = this.boundingClientRectCache.get(span);

    if (!cachedBoundingClientRect) {
      console.debug('span NOT in cache: ', span);
      const boundingClientRect = span.getBoundingClientRect();

      this.boundingClientRectCache.set(span, boundingClientRect);

      return boundingClientRect;
    }
    console.debug('span IS in cache: ', span);

    return cachedBoundingClientRect;
  }
}
