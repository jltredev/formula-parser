import {Parser} from '../../../../src/parser';

describe('.parse() statistical formulas', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });
  afterEach(() => {
    parser = null;
  });

  it('AVEDEV', () => {
    expect(parser.parse('AVEDEV()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('AVEDEV(1.1)')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('AVEDEV(1.1, 2)')).to.almost.eql({error: null, result: 0.45}, 1e-9);
    expect(parser.parse('AVEDEV(1.1, 2, 5)')).to.almost.eql({error: null, result: 1.53}, 1e-9);
    expect(parser.parse('AVEDEV(1.1, 2, 5, 10)')).to.almost.eql({error: null, result: 2.975}, 1e-9);
  });

  it('AVERAGE', () => {
    expect(parser.parse('AVERAGE()')).to.deep.equal({error: null, result: NaN});
    expect(parser.parse('AVERAGE(1.1)')).to.almost.eql({error: null, result: 1.1}, 1e-9);
    expect(parser.parse('AVERAGE(1.1, 2, 5, 10)')).to.almost.eql({error: null, result: 4.525}, 1e-9);
    expect(parser.parse('AVERAGE(1.1, TRUE, 2, NULL, 5, 10)')).to.almost.eql({error: null, result: 4.525}, 1e-9);
  });

  it('AVERAGEA', () => {
    expect(parser.parse('AVERAGEA()')).to.deep.equal({error: null, result: NaN});
    expect(parser.parse('AVERAGEA(1.1)')).to.almost.eql({error: null, result: 1.1}, 1e-9);
    expect(parser.parse('AVERAGEA(1.1, 2, 5, 10)')).to.almost.eql({error: null, result: 4.525}, 1e-9);
    expect(parser.parse('AVERAGEA(1.1, TRUE, 2, NULL, 5, 10)')).to.almost.eql({error: null, result: 3.82}, 1e-9);
  });

  it('AVERAGEIF', () => {
    parser.on('callRangeValue', (a, b, done) => {
      if (a.label === 'A1' && b.label === 'B3') {
        done([[2, 4], [8, 16]]);
      } else if (a.label === 'A4' && b.label === 'B6') {
        done([[1, 2], [3, 4]]);
      }
    });

    expect(parser.parse('AVERAGEIF(A1:B3, ">5", A4:B6)')).to.deep.equal({error: null, result: 3.5});
  });

  it('AVERAGEIFS', () => {
    parser.on('callRangeValue', (a, b, done) => {
      if (a.label === 'A1' && b.label === 'D1') {
        done([2, 4, 8, 16]);
      } else if (a.label === 'A2' && b.label === 'D2') {
        done([1, 2, 3, 4]);
      } else if (a.label === 'A3' && b.label === 'D3') {
        done([1, 2, 3, 4]);
      }
    });

    expect(parser.parse('AVERAGEIFS(A1:D1, A2:D2, ">2", A3:D3, ">2")')).to.deep.equal({error: null, result: 12});
  });

  it('BETADIST', () => {
    expect(parser.parse('BETADIST()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('BETADIST(2)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('BETADIST(2, 8)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('BETADIST(2, 8, 10)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('BETADIST(2, 8, 10, TRUE, 1)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('BETADIST(2, 8, 10, TRUE, 1, 3)')).to.almost.eql({error: null, result: 0.6854705810117458}, 1e-9);
    expect(parser.parse('BETA.DIST(2, 8, 10, TRUE, 1, 3)')).to.almost.eql({error: null, result: 0.6854705810117458}, 1e-9);
  });

  it('BETAINV', () => {
    expect(parser.parse('BETAINV()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('BETAINV(0.6854705810117458, 8, 10, 1, 3)')).to.almost.eql({error: null, result: 2}, 1e-9);
    expect(parser.parse('BETA.INV(0.6854705810117458, 8, 10, 1, 3)')).to.almost.eql({error: null, result: 2}, 1e-9);
  });

  it('BINOMDIST', () => {
    expect(parser.parse('BINOMDIST()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('BINOMDIST(6)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('BINOMDIST(6, 10)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('BINOMDIST(6, 10, 0.5)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('BINOMDIST(6, 10, 0.5, FALSE)')).to.almost.eql({error: null, result: 0.205078125}, 1e-9);
    expect(parser.parse('BINOM.DIST(6, 10, 0.5, FALSE)')).to.almost.eql({error: null, result: 0.205078125}, 1e-9);
  });

  it('BINOM.DIST.RANGE', () => {
    expect(parser.parse('BINOM.DIST.RANGE()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('BINOM.DIST.RANGE(60)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('BINOM.DIST.RANGE(60, 0.5)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('BINOM.DIST.RANGE(60, 0.5, 34)')).to.almost.eql({error: null, result: 0.060616586840172675}, 1e-9);
  });

  it('BINOM.INV', () => {
    expect(parser.parse('BINOM.INV()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('BINOM.INV(6)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('BINOM.INV(6, 0.5)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('BINOM.INV(6, 0.5, 0.7)')).to.deep.equal({error: null, result: 4});
  });

  it('CHISQ.DIST', () => {
    expect(parser.parse('CHISQ.DIST()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('CHISQ.DIST(0.5)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('CHISQ.DIST(0.5, 1)')).to.almost.eql({error: null, result: 0.43939128946770356}, 1e-9);
    expect(parser.parse('CHISQ.DIST(0.5, 1, TRUE)')).to.almost.eql({error: null, result: 0.5204998778130242}, 1e-9);
  });

  it('CHISQ.DIST.RT', () => {
    expect(parser.parse('CHISQ.DIST.RT()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('CHISQ.DIST.RT(0.5)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('CHISQ.DIST.RT(0.5, 1)')).to.deep.equal({error: '#NUM!', result: null});
    expect(parser.parse('CHISQ.DIST.RT(3, 5)')).to.almost.eql({error: null, result: 0.6999858358786271}, 1e-9);
  });

  it('CHISQ.INV', () => {
    expect(parser.parse('CHISQ.INV()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('CHISQ.INV(0.5)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('CHISQ.INV(0.5, 6)')).to.almost.eql({error: null, result: 5.348120627447116}, 1e-9);
  });

  it('CHISQ.INV.RT', () => {
    expect(parser.parse('CHISQ.INV.RT()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('CHISQ.INV.RT(0.5)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('CHISQ.INV.RT(-1, 2)')).to.deep.equal({error: '#NUM!', result: null});
    expect(parser.parse('CHISQ.INV.RT(0.4, 6)')).to.almost.eql({error: null, result: 6.2107571945266935}, 1e-9);
  });

  it('COLUMN', () => {
    parser.on('callRangeValue', (a, b, done) => {
      if (a.label === 'A1' && b.label === 'C2') {
        done([[1, 2], [2, 3], [2, 4]]);
      }
    });

    expect(parser.parse('COLUMN()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('COLUMN(A1:C2)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('COLUMN(A1:C2, 0)')).to.deep.equal({error: null, result: [[1], [2], [2]]});
    expect(parser.parse('COLUMN(A1:C2, 1)')).to.deep.equal({error: null, result: [[2], [3], [4]]});
  });

  it('COLUMNS', () => {
    parser.on('callRangeValue', (a, b, done) => {
      if (a.label === 'A1' && b.label === 'C2') {
        done([[1, 2], [2, 3], [2, 4]]);
      }
    });

    expect(parser.parse('COLUMNS()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('COLUMNS(A1:C2)')).to.deep.equal({error: null, result: 2});
  });

  it('CONFIDENCE', () => {
    expect(parser.parse('CONFIDENCE()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('CONFIDENCE(0.5)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('CONFIDENCE(0.5, 1)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('CONFIDENCE(0.5, 1, 5)')).to.almost.eql({error: null, result: 0.301640986313058}, 1e-9);
    expect(parser.parse('CONFIDENCE.NORM(0.5, 1, 5)')).to.almost.eql({error: null, result: 0.301640986313058}, 1e-9);
  });

  it('CONFIDENCE.T', () => {
    expect(parser.parse('CONFIDENCE.T()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('CONFIDENCE.T(0.5)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('CONFIDENCE.T(0.5, 1)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('CONFIDENCE.T(0.5, 1, 5)')).to.almost.eql({error: null, result: 0.33124980616238564}, 1e-9);
  });

  it('CORREL', () => {
    parser.setVariable('foo', [3, 2, 4, 5, 6]);
    parser.setVariable('bar', [9, 7, 12, 15, 17]);

    expect(parser.parse('CORREL()')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('CORREL(foo, bar)')).to.almost.eql({error: null, result: 0.9970544855015815}, 1e-9);
  });

  it('COUNT', () => {
    expect(parser.parse('COUNT()')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('COUNT(0.5)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('COUNT(TRUE, 0.5, "foo", 1, 8)')).to.deep.equal({error: null, result: 3});
  });

  it('COUNTA', () => {
    expect(parser.parse('COUNTA()')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('COUNTA(0.5)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('COUNTA(TRUE, 0.5, "foo", 1, 8)')).to.deep.equal({error: null, result: 5});
  });

  it('COUNTBLANK', () => {
    expect(parser.parse('COUNTBLANK()')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('COUNTBLANK(0.5)')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('COUNTBLANK(TRUE, 0.5, "", 1, 8)')).to.deep.equal({error: null, result: 1});
  });

  it('COUNTIF', () => {
    parser.setVariable('foo', [1, null, 3, 'a', '']);
    parser.on('callRangeValue', (a, b, done) => {
      if (a.label === 'A1' && b.label === 'C2') {
        done([[1, null, 3], ['a', 4, 'c']]);
      }
    });

    expect(parser.parse('COUNTIF(foo, ">1")')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('COUNTIF(A1:C2, ">1")')).to.deep.equal({error: null, result: 2});
  });

  it('COUNTIFS', () => {
    parser.setVariable('foo', [1, null, 3, 'a', '']);
    parser.on('callRangeValue', (a, b, done) => {
      if (a.label === 'A1' && b.label === 'C2') {
        done([[1, null, 3], ['a', 4, 'c']]);
      }
    });

    expect(parser.parse('COUNTIFS(foo, ">1")')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('COUNTIFS(A1:C2, ">1")')).to.deep.equal({error: null, result: 2});
  });

  it('COUNTIN', () => {
    parser.setVariable('foo', [1, 1, 2, 2, 2]);

    expect(parser.parse('COUNTIN(foo, 1)')).to.deep.equal({error: null, result: 2});
    expect(parser.parse('COUNTIN(foo, 2)')).to.deep.equal({error: null, result: 3});
  });

  it('COUNTUNIQUE', () => {
    expect(parser.parse('COUNTUNIQUE()')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('COUNTUNIQUE(1, 1, 2, 2, 3)')).to.deep.equal({error: null, result: 3});
    expect(parser.parse('COUNTUNIQUE(1, 1, 2, 2, 3, "a", "a")')).to.deep.equal({error: null, result: 4});
  });

  it('COVARIANCE.P', () => {
    parser.setVariable('foo', [3, 2, 4, 5, 6]);
    parser.setVariable('bar', [9, 7, 12, 15, 17]);

    expect(parser.parse('COVARIANCE.P(foo, bar)')).to.deep.equal({error: null, result: 5.2});
  });

  it('COVARIANCE.S', () => {
    parser.setVariable('foo', [2, 4, 8]);
    parser.setVariable('bar', [5, 11, 12]);

    expect(parser.parse('COVARIANCE.S(foo, bar)')).to.almost.eql({error: null, result: 9.666666666}, 1e-9);
  });

  it('DEVSQ', () => {
    parser.setVariable('foo', [4, 5, 8, 7, 11, 4, 3]);

    expect(parser.parse('DEVSQ(foo)')).to.deep.equal({error: null, result: 48});
  });

  it('EXPONDIST', () => {
    expect(parser.parse('EXPONDIST()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('EXPONDIST(0.2)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('EXPONDIST(0.2, 10)')).to.almost.eql({error: null, result: 1.353352832366127}, 1e-9);
    expect(parser.parse('EXPONDIST(0.2, 10, TRUE)')).to.almost.eql({error: null, result: 0.8646647167633873}, 1e-9);
    expect(parser.parse('EXPONDIST(0.2, 10, TRUE)')).to.almost.eql({error: null, result: 0.8646647167633873}, 1e-9);
  });

  it('FDIST', () => {
    expect(parser.parse('FDIST()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('FDIST(15)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('FDIST(15, 6)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('FDIST(15, 6, 4)')).to.almost.eql({error: null, result: 0.0012714469079329002}, 1e-9);
    expect(parser.parse('FDIST(15, 6, 4, TRUE)')).to.almost.eql({error: null, result: 0.9897419523940192}, 1e-9);
    expect(parser.parse('F.DIST(15, 6, 4, TRUE)')).to.almost.eql({error: null, result: 0.9897419523940192}, 1e-9);
  });

  it('FDISTRT', () => {
    expect(parser.parse('FDISTRT()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('FDISTRT(15)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('FDISTRT(15, 6)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('FDISTRT(15, 6, 4)')).to.almost.eql({error: null, result: 0.010258047605980813}, 1e-9);
    expect(parser.parse('F.DIST.RT(15, 6, 4)')).to.almost.eql({error: null, result: 0.010258047605980813}, 1e-9);
  });

  it('FINV', () => {
    expect(parser.parse('FINV()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('FINV(0.1)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('FINV(0.1, 6)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('FINV(0.1, 6, 4)')).to.almost.eql({error: null, result: 0.31438998832176834}, 1e-9);
    expect(parser.parse('F.INV(0.1, 6, 4)')).to.almost.eql({error: null, result: 0.31438998832176834}, 1e-9);
  });

  it('FINV', () => {
    expect(parser.parse('FINVRT()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('FINVRT(0.1)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('FINVRT(0.1, 6)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('FINVRT(0.1, 6, 4)')).to.almost.eql({error: null, result: 4.009749312673947}, 1e-9);
    expect(parser.parse('F.INV.RT(0.1, 6, 4)')).to.almost.eql({error: null, result: 4.009749312673947}, 1e-9);
  });

  it('FISHER', () => {
    expect(parser.parse('FISHER()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('FISHER(0.1)')).to.almost.eql({error: null, result: 0.10033534773107562}, 1e-9);
    expect(parser.parse('FISHER(1)')).to.deep.equal({error: null, result: Infinity});
  });

  it('FISHERINV', () => {
    expect(parser.parse('FISHERINV()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('FISHERINV(0.1)')).to.almost.eql({error: null, result: 0.09966799462495583}, 1e-9);
    expect(parser.parse('FISHERINV(1)')).to.almost.eql({error: null, result: 0.761594155955765}, 1e-9);
  });

  it('FORECAST', () => {
    parser.setVariable('foo', [6, 7, 9, 15, 21]);
    parser.setVariable('bar', [20, 28, 31, 38, 40]);

    expect(parser.parse('FORECAST(30, foo, bar)')).to.almost.eql({error: null, result: 10.607253086419755}, 1e-9);
  });

  it('FREQUENCY', () => {
    parser.setVariable('foo', [79, 85, 78, 85, 50, 81, 95, 88, 97]);
    parser.setVariable('bar', [70, 79, 89]);

    expect(parser.parse('FREQUENCY(foo, bar)')).to.deep.equal({error: null, result: [1, 2, 4, 2]});
  });

  it('GAMMA', () => {
    expect(parser.parse('GAMMA()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('GAMMA(0.1)')).to.almost.eql({error: null, result: 9.51350769866877}, 1e-9);
  });

  it('GAMMADIST', () => {
    expect(parser.parse('GAMMADIST()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('GAMMADIST(1)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('GAMMADIST(1, 3)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('GAMMADIST(1, 3, 7)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('GAMMADIST(1, 3, 7, TRUE)')).to.almost.eql({error: null, result: 0.00043670743091302124}, 1e-9);
    expect(parser.parse('GAMMA.DIST(1, 3, 7, TRUE)')).to.almost.eql({error: null, result: 0.00043670743091302124}, 1e-9);
  });

  it('GAMMAINV', () => {
    expect(parser.parse('GAMMAINV()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('GAMMAINV(1)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('GAMMAINV(1, 3)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('GAMMAINV(1, 3, 7)')).to.almost.eql({error: null, result: 1233.435565298214}, 1e-9);
    expect(parser.parse('GAMMA.INV(1, 3, 7)')).to.almost.eql({error: null, result: 1233.435565298214}, 1e-9);
  });

  it('GAMMALN', () => {
    expect(parser.parse('GAMMALN()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('GAMMALN(4)')).to.almost.eql({error: null, result: 1.7917594692280547}, 1e-9);
  });

  it('GAMMALN.PRECISE', () => {
    expect(parser.parse('GAMMALN.PRECISE()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('GAMMALN.PRECISE(4)')).to.almost.eql({error: null, result: 1.7917594692280547}, 1e-9);
  });

  it('GAUSS', () => {
    expect(parser.parse('GAUSS()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('GAUSS(4)')).to.almost.eql({error: null, result: 0.4999683287581669}, 1e-9);
  });

  it('GEOMEAN', () => {
    parser.setVariable('foo', [4, 5, 8, 7, 11, 4, 3]);

    expect(parser.parse('GEOMEAN(foo)')).to.almost.eql({error: null, result: 5.476986969656962}, 1e-9);
  });

  it('GROWTH', () => {
    parser.setVariable('foo', [33100, 47300, 69000, 102000, 150000, 220000]);
    parser.setVariable('bar', [11, 12, 13, 14, 15, 16]);
    parser.setVariable('baz', [11, 12, 13, 14, 15, 16, 17, 18, 19]);

    expect(parser.parse('GROWTH(foo, bar, baz)')).to.deep.equal({error: null, result: [
      32618.20377353843,
      47729.422614746654,
      69841.30085621699,
      102197.07337883323,
      149542.4867400496,
      218821.8762146044,
      320196.71836349065,
      468536.05418408196,
      685597.3889812973
    ]});
  });

  it('HARMEAN', () => {
    parser.setVariable('foo', [4, 5, 8, 7, 11, 4, 3]);

    expect(parser.parse('HARMEAN(foo)')).to.almost.eql({error: null, result: 5.028375962061728}, 1e-9);
  });

  it('HYPGEOMDIST', () => {
    expect(parser.parse('HYPGEOMDIST()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('HYPGEOMDIST(1)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('HYPGEOMDIST(1, 4)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('HYPGEOMDIST(1, 4, 8)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('HYPGEOMDIST(1, 4, 8, 20)')).to.almost.eql({error: null, result: 0.3632610939112487}, 1e-9);
    expect(parser.parse('HYPGEOMDIST(1, 4, 8, 20, TRUE)')).to.almost.eql({error: null, result: 0.46542827657378744}, 1e-9);
  });

  it('INTERCEPT', () => {
    parser.setVariable('foo', [2, 3, 9, 1, 8]);
    parser.setVariable('bar', [6, 5, 11, 7, 5]);

    expect(parser.parse('INTERCEPT(foo, bar)')).to.almost.eql({error: null, result: 0.04838709677419217}, 1e-9);
  });

  it('KURT', () => {
    parser.setVariable('foo', [3, 4, 5, 2, 3, 4, 5, 6, 4, 7]);
    parser.setVariable('bar', [3, 4, 5, 2, 3, 4, 5, 'dewdwe', 4, 7]);

    expect(parser.parse('KURT(foo)')).to.almost.eql({error: null, result: -0.15179963720841627}, 1e-9);
    expect(parser.parse('KURT(bar)')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('LARGE', () => {
    parser.setVariable('foo', [3, 5, 3, 5, 4]);
    parser.setVariable('bar', [3, 5, 3, 'dwedwed', 4]);

    expect(parser.parse('LARGE(foo, 3)')).to.deep.equal({error: null, result: 4});
    expect(parser.parse('LARGE(bar, 3)')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('LINEST', () => {
    parser.setVariable('foo', [1, 9, 5, 7]);
    parser.setVariable('bar', [0, 4, 2, 3]);

    expect(parser.parse('LINEST(foo, bar)')).to.deep.equal({error: null, result: [2, 1]});
    expect(parser.parse('LINEST(foo, "aaaaaa")')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('LOGEST', () => {
    parser.setVariable('foo', [1, 9, 5, 7]);
    parser.setVariable('bar', [0, 4, 2, 3]);

    expect(parser.parse('LOGEST(foo, bar)')).to.deep.equal({error: null, result: [1.751116, 1.194316]});
    expect(parser.parse('LOGEST(foo, "aaaaaa")')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('LOGNORMDIST', () => {
    expect(parser.parse('LOGNORMDIST()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('LOGNORMDIST(4)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('LOGNORMDIST(4, 3.5)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('LOGNORMDIST(4, 3.5, 1.2)')).to.almost.eql({error: null, result: 0.01761759668181924}, 1e-9);
    expect(parser.parse('LOGNORMDIST(4, 3.5, 1.2, TRUE)')).to.almost.eql({error: null, result: 0.0390835557068005}, 1e-9);
    expect(parser.parse('LOGNORM.DIST(4, 3.5, 1.2, TRUE)')).to.almost.eql({error: null, result: 0.0390835557068005}, 1e-9);
  });

  it('LOGNORMINV', () => {
    expect(parser.parse('LOGNORMINV()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('LOGNORMINV(0.0390835557068005)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('LOGNORMINV(0.0390835557068005, 3.5)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('LOGNORMINV(0.0390835557068005, 3.5, 1.2)')).to.almost.eql({error: null, result: 4}, 1e-9);
    expect(parser.parse('LOGNORM.INV(0.0390835557068005, 3.5, 1.2)')).to.almost.eql({error: null, result: 4}, 1e-9);
  });

  it('MAX', () => {
    expect(parser.parse('MAX()')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('MAX(-1, 9, 9.2, 4, "foo", TRUE)')).to.deep.equal({error: null, result: 9.2});
  });

  it('MAXA', () => {
    expect(parser.parse('MAXA()')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('MAXA(-1, 9, 9.2, 4, "foo", TRUE)')).to.deep.equal({error: null, result: 9.2});
  });

  it('MEDIAN', () => {
    expect(parser.parse('MEDIAN()')).to.deep.equal({error: null, result: NaN});
    expect(parser.parse('MEDIAN(1, 9, 9.2, 4)')).to.deep.equal({error: null, result: 6.5});
  });

  it('MIN', () => {
    expect(parser.parse('MIN()')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('MIN(-1.1, 9, 9.2, 4, "foo", TRUE)')).to.deep.equal({error: null, result: -1.1});
  });

  it('MINA', () => {
    expect(parser.parse('MINA()')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('MINA(-1.1, 9, 9.2, 4, "foo", TRUE)')).to.deep.equal({error: null, result: -1.1});
  });

  it('MODEMULT', () => {
    parser.setVariable('foo', [1, 2, 3, 4, 3, 2, 1, 2, 3, 5, 6, 1]);
    parser.setVariable('bar', [1, 2, 'dewdew', 4, 3, 2, 1, 2, 3, 5, 6, 1]);

    expect(parser.parse('MODEMULT(foo)')).to.deep.equal({error: null, result: [2, 3, 1]});
    expect(parser.parse('MODE.MULT(foo)')).to.deep.equal({error: null, result: [2, 3, 1]});
    expect(parser.parse('MODEMULT(bar)')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('MODESNGL', () => {
    parser.setVariable('foo', [5.6, 4, 4, 3, 2, 4]);
    parser.setVariable('bar', [5.6, 'dewdew', 4, 3, 2, 4]);

    expect(parser.parse('MODESNGL(foo)')).to.deep.equal({error: null, result: 4});
    expect(parser.parse('MODE.SNGL(foo)')).to.deep.equal({error: null, result: 4});
    expect(parser.parse('MODESNGL(bar)')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('NEGBINOMDIST', () => {
    expect(parser.parse('NEGBINOMDIST()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('NEGBINOMDIST(10)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('NEGBINOMDIST(10, 5)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('NEGBINOMDIST(10, 5, 0.25)')).to.almost.eql({error: null, result: 0.05504866037517786}, 1e-9);
    expect(parser.parse('NEGBINOMDIST(10, 5, 0.25, TRUE)')).to.almost.eql({error: null, result: 0.3135140584781766}, 1e-9);
    expect(parser.parse('NEGBINOM.DIST(10, 5, 0.25, TRUE)')).to.almost.eql({error: null, result: 0.3135140584781766}, 1e-9);
  });

  it('NORMDIST', () => {
    expect(parser.parse('NORMDIST()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('NORMDIST(1)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('NORMDIST(1, 0)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('NORMDIST(1, 0, 1)')).to.almost.eql({error: null, result: 0.24197072451914337}, 1e-9);
    expect(parser.parse('NORMDIST(1, 0, 1, TRUE)')).to.almost.eql({error: null, result: 0.8413447460685429}, 1e-9);
    expect(parser.parse('NORM.DIST(1, 0, 1, TRUE)')).to.almost.eql({error: null, result: 0.8413447460685429}, 1e-9);
  });

  it('NORMINV', () => {
    expect(parser.parse('NORMINV()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('NORMINV(1)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('NORMINV(1, 0)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('NORMINV(1, 0, 1)')).to.almost.eql({error: null, result: 141.4213562373095}, 1e-9);
    expect(parser.parse('NORM.INV(1, 0, 1)')).to.almost.eql({error: null, result: 141.4213562373095}, 1e-9);
  });

  it('NORMSDIST', () => {
    expect(parser.parse('NORMSDIST()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('NORMSDIST(1)')).to.almost.eql({error: null, result: 0.24197072451914337}, 1e-9);
    expect(parser.parse('NORMSDIST(1, TRUE)')).to.almost.eql({error: null, result: 0.8413447460685429}, 1e-9);
    expect(parser.parse('NORM.S.DIST(1, TRUE)')).to.almost.eql({error: null, result: 0.8413447460685429}, 1e-9);
  });

  it('NORMSINV', () => {
    expect(parser.parse('NORMSINV()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('NORMSINV(1)')).to.almost.eql({error: null, result: 141.4213562373095}, 1e-9);
    expect(parser.parse('NORM.S.INV(1)')).to.almost.eql({error: null, result: 141.4213562373095}, 1e-9);
  });

  it('PEARSON', () => {
    parser.setVariable('foo', [9, 7, 5, 3, 1]);
    parser.setVariable('bar', [10, 6, 1, 5, 3]);
    parser.setVariable('baz', [10, 'dewdewd', 1, 5, 3]);

    expect(parser.parse('PEARSON(foo, bar)')).to.almost.eql({error: null, result: 0.6993786061802354}, 1e-9);
    expect(parser.parse('PEARSON(foo, baz)')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('PERCENTILEEXC', () => {
    parser.setVariable('foo', [1, 2, 3, 4]);
    parser.setVariable('bar', [1, 'dewdew', 3, 4]);

    expect(parser.parse('PERCENTILEEXC(foo, 0)')).to.deep.equal({error: '#NUM!', result: null});
    expect(parser.parse('PERCENTILEEXC(foo, 0.5)')).to.deep.equal({error: null, result: 2.5});
    expect(parser.parse('PERCENTILEEXC(bar, 0.5)')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('PERCENTILEINC', () => {
    parser.setVariable('foo', [1, 2, 3, 4]);
    parser.setVariable('bar', [1, 'dewdew', 3, 4]);

    expect(parser.parse('PERCENTILEINC(foo, 0)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('PERCENTILEINC(foo, 0.5)')).to.deep.equal({error: null, result: 2.5});
    expect(parser.parse('PERCENTILEINC(bar, 0.5)')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('PERCENTRANKEXC', () => {
    parser.setVariable('foo', [1, 2, 3, 4]);
    parser.setVariable('bar', [1, 'dewdew', 3, 4]);

    expect(parser.parse('PERCENTRANKEXC(foo, 1)')).to.deep.equal({error: null, result: 0.2});
    expect(parser.parse('PERCENTRANKEXC(foo, 4)')).to.deep.equal({error: null, result: 0.8});
    expect(parser.parse('PERCENTRANKEXC(bar, 4)')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('PERCENTRANKINC', () => {
    parser.setVariable('foo', [1, 2, 3, 4]);
    parser.setVariable('bar', [1, 'dewdew', 3, 4]);

    expect(parser.parse('PERCENTRANKINC(foo, 1)')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('PERCENTRANKINC(foo, 4)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('PERCENTRANKINC(bar, 4)')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('PERMUT', () => {
    expect(parser.parse('PERMUT()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('PERMUT(10)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('PERMUT(10, 3)')).to.deep.equal({error: null, result: 720});
  });

  it('PERMUTATIONA', () => {
    expect(parser.parse('PERMUTATIONA()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('PERMUTATIONA(10)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('PERMUTATIONA(10, 3)')).to.deep.equal({error: null, result: 1000});
  });

  it('PHI', () => {
    expect(parser.parse('PHI()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('PHI(1)')).to.almost.eql({error: null, result: 0.24197072451914337}, 1e-9);
  });

  it('POISSONDIST', () => {
    expect(parser.parse('POISSONDIST()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('POISSONDIST(1)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('POISSONDIST(1, 3)')).to.almost.eql({error: null, result: 0.14936120510359185}, 1e-9);
    expect(parser.parse('POISSONDIST(1, 3, TRUE)')).to.almost.eql({error: null, result: 0.1991482734714558}, 1e-9);
    expect(parser.parse('POISSON.DIST(1, 3, TRUE)')).to.almost.eql({error: null, result: 0.1991482734714558}, 1e-9);
  });

  it('PROB', () => {
    parser.setVariable('foo', [0, 1, 2, 3]);
    parser.setVariable('bar', [0.2, 0.3, 0.1, 0.4]);
    parser.setVariable('baz', [0, 'dewd', 2, 3]);

    expect(parser.parse('PROB(foo, bar, 2)')).to.deep.equal({error: null, result: 0.1});
    expect(parser.parse('PROB(foo, bar, 1, 3)')).to.deep.equal({error: null, result: 0.8});
    expect(parser.parse('PROB(foo, bar)')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('PROB(baz, bar, 1, 3)')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('QUARTILEEXC', () => {
    parser.setVariable('foo', [6, 7, 15, 36, 39, 40, 41, 42, 43, 47, 49]);

    expect(parser.parse('QUARTILEEXC(foo, 1)')).to.deep.equal({error: null, result: 15});
    expect(parser.parse('QUARTILEEXC(foo, 2)')).to.deep.equal({error: null, result: 40});
    expect(parser.parse('QUARTILE.EXC(foo, 2)')).to.deep.equal({error: null, result: 40});
    expect(parser.parse('QUARTILEEXC(foo, 4)')).to.deep.equal({error: '#NUM!', result: null});
    expect(parser.parse('QUARTILEEXC(foo, "dwe")')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('QUARTILEINC', () => {
    parser.setVariable('foo', [1, 2, 4, 7, 8, 9, 10, 12]);

    expect(parser.parse('QUARTILEINC(foo, 1)')).to.deep.equal({error: null, result: 3.5});
    expect(parser.parse('QUARTILEINC(foo, 2)')).to.deep.equal({error: null, result: 7.5});
    expect(parser.parse('QUARTILE.INC(foo, 2)')).to.deep.equal({error: null, result: 7.5});
    expect(parser.parse('QUARTILEINC(foo, 4)')).to.deep.equal({error: '#NUM!', result: null});
    expect(parser.parse('QUARTILEINC(foo, "dwe")')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('RANKAVG', () => {
    parser.setVariable('foo', [89, 88, 92, 101, 94, 97, 95]);

    expect(parser.parse('RANKAVG(94, foo)')).to.deep.equal({error: null, result: 4});
    expect(parser.parse('RANKAVG(88, foo, 1)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('RANK.AVG(88, foo, 1)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('RANKAVG("dwe", foo, 1)')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('RANKEQ', () => {
    parser.setVariable('foo', [7, 3.5, 3.5, 1, 2]);

    expect(parser.parse('RANKEQ(7, foo, 1)')).to.deep.equal({error: null, result: 5});
    expect(parser.parse('RANKEQ(2, foo)')).to.deep.equal({error: null, result: 4});
    expect(parser.parse('RANK.EQ(2, foo)')).to.deep.equal({error: null, result: 4});
    expect(parser.parse('RANKEQ("dwe", foo, TRUE)')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('ROW', () => {
    parser.on('callRangeValue', (a, b, done) => {
      if (a.label === 'A1' && b.label === 'C2') {
        done([[1, 2], [2, 3], [2, 4]]);
      }
    });

    expect(parser.parse('ROW()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('ROW(A1:C2)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('ROW(A1:C2, -1)')).to.deep.equal({error: '#NUM!', result: null});
    expect(parser.parse('ROW(A1:C2, 0)')).to.deep.equal({error: null, result: [1, 2]});
    expect(parser.parse('ROW(A1:C2, 2)')).to.deep.equal({error: null, result: [2, 4]});
  });

  it('ROWS', () => {
    parser.on('callRangeValue', (a, b, done) => {
      if (a.label === 'A1' && b.label === 'C2') {
        done([[1, 2], [2, 3], [2, 4]]);
      }
    });

    expect(parser.parse('ROWS()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('ROWS(A1:C2)')).to.deep.equal({error: null, result: 3});
  });

  it('RSQ', () => {
    parser.setVariable('foo', [2, 3, 9, 1, 8, 7, 5]);
    parser.setVariable('bar', [6, 5, 11, 7, 5, 4, 4]);
    parser.setVariable('baz', [6, 'dwe', 11, 7, 5, 4, 4]);

    expect(parser.parse('RSQ(foo, bar)')).to.almost.eql({error: null, result: 0.05795019157088122}, 1e-9);
    expect(parser.parse('RSQ(baz, bar)')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('SKEW', () => {
    parser.setVariable('foo', [3, 4, 5, 2, 3, 4, 5, 6, 4, 7]);
    parser.setVariable('bar', [3, 'dwe', 5, 2, 3, 4, 5, 6, 4, 7]);

    expect(parser.parse('SKEW(foo)')).to.almost.eql({error: null, result: 0.3595430714067974}, 1e-9);
    expect(parser.parse('SKEW(bar)')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('SKEWP', () => {
    parser.setVariable('foo', [3, 4, 5, 2, 3, 4, 5, 6, 4, 7]);
    parser.setVariable('bar', [3, 'dwe', 5, 2, 3, 4, 5, 6, 4, 7]);

    expect(parser.parse('SKEWP(foo)')).to.almost.eql({error: null, result: 0.303193339354144}, 1e-9);
    expect(parser.parse('SKEW.P(foo)')).to.almost.eql({error: null, result: 0.303193339354144}, 1e-9);
    expect(parser.parse('SKEWP(bar)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('SKEW.P(bar)')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('SLOPE', () => {
    parser.setVariable('foo', [2, 3, 9, 1, 8, 7, 5]);
    parser.setVariable('bar', [6, 5, 11, 7, 5, 4, 4]);
    parser.setVariable('baz', [6, 'dwe', 11, 7, 5, 4, 4]);

    expect(parser.parse('SLOPE(foo, bar)')).to.almost.eql({error: null, result: 0.3055555555555556}, 1e-9);
    expect(parser.parse('SLOPE(baz, bar)')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('SMALL', () => {
    parser.setVariable('foo', [3, 4, 5, 2, 3, 4, 6, 4, 7]);
    parser.setVariable('bar', [3, 4, 'dwe', 2, 3, 4, 6, 4, 7]);

    expect(parser.parse('SMALL(foo, 4)')).to.deep.equal({error: null, result: 4});
    expect(parser.parse('SMALL(bar, 4)')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('STANDARDIZE', () => {
    expect(parser.parse('STANDARDIZE()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('STANDARDIZE(1)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('STANDARDIZE(1, 3)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('STANDARDIZE(1, 3, 5)')).to.deep.equal({error: null, result: -0.4});
  });

  it('STDEVP', () => {
    parser.setVariable('foo', [1345, 1301, 1368, 1322, 1310, 1370, 1318, 1350, 1303, 1299]);

    expect(parser.parse('STDEVP(foo)')).to.almost.eql({error: null, result: 26.054558142482477}, 1e-9);
    expect(parser.parse('STDEV.P(foo)')).to.almost.eql({error: null, result: 26.054558142482477}, 1e-9);
  });

  it('STDEVS', () => {
    parser.setVariable('foo', [1345, 1301, 1368, 1322, 1310, 1370, 1318, 1350, 1303, 1299]);

    expect(parser.parse('STDEVS(foo)')).to.almost.eql({error: null, result: 27.46391571984349}, 1e-9);
    expect(parser.parse('STDEV.S(foo)')).to.almost.eql({error: null, result: 27.46391571984349}, 1e-9);
  });

  it('STDEVA', () => {
    parser.setVariable('foo', [1345, 1301, 1368, 1322, 1310, 1370, 1318, 1350, 1303, 1299]);

    expect(parser.parse('STDEVA(foo)')).to.almost.eql({error: null, result: 27.46391571984349}, 1e-9);
  });

  it('STDEVPA', () => {
    parser.setVariable('foo', [1345, 1301, 1368, 1322, 1310, 1370, 1318, 1350, 1303, 1299]);

    expect(parser.parse('STDEVPA(foo)')).to.almost.eql({error: null, result: 26.054558142482477}, 1e-9);
  });

  it('STEYX', () => {
    parser.setVariable('foo', [2, 3, 9, 1, 8, 7, 5]);
    parser.setVariable('bar', [6, 5, 11, 7, 5, 4, 4]);
    parser.setVariable('baz', [6, 5, 'dwe', 7, 5, 4, 4]);

    expect(parser.parse('STEYX(foo, bar)')).to.almost.eql({error: null, result: 3.305718950210041}, 1e-9);
    expect(parser.parse('STEYX(baz, bar)')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('TRANSPOSE', () => {
    parser.on('callRangeValue', (a, b, done) => {
      if (a.label === 'A1' && b.label === 'C2') {
        done([[1, 2], [3, 4], [5, 6]]);
      } else if (a.label === 'A3' && b.label === 'C3') {
        done([1, 2, 3]);
      }
    });

    expect(parser.parse('TRANSPOSE()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('TRANSPOSE(A1:C2)')).to.deep.equal({error: null, result: [[1, 3, 5], [2, 4, 6]]});
    expect(parser.parse('TRANSPOSE(A3:C3)')).to.deep.equal({error: null, result: [[1], [2], [3]]});
  });

  it('TDIST', () => {
    expect(parser.parse('TDIST()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('TDIST(1)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('TDIST(1, 3)')).to.almost.eql({error: null, result: 0.2067483346226397}, 1e-9);
    expect(parser.parse('TDIST(1, 3, TRUE)')).to.almost.eql({error: null, result: 0.8044988904727264}, 1e-9);
    expect(parser.parse('T.DIST(1, 3, TRUE)')).to.almost.eql({error: null, result: 0.8044988904727264}, 1e-9);
  });

  it('T.DIST.2T', () => {
    expect(parser.parse('T.DIST.2T()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('T.DIST.2T(1)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('T.DIST.2T(1, 6)')).to.almost.eql({error: null, result: 0.3559176837495821}, 1e-9);
  });

  it('T.DIST.RT', () => {
    expect(parser.parse('T.DIST.RT()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('T.DIST.RT(1)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('T.DIST.RT(1, 6)')).to.almost.eql({error: null, result: 0.17795884187479105}, 1e-9);
  });

  it('TINV', () => {
    expect(parser.parse('TINV()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('TINV(0.1)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('TINV(0.1, 6)')).to.almost.eql({error: null, result: -1.4397557472652736}, 1e-9);
    expect(parser.parse('T.INV(0.1, 6)')).to.almost.eql({error: null, result: -1.4397557472652736}, 1e-9);
  });

  it('T.INV.2T', () => {
    expect(parser.parse('T.INV.2T()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('T.INV.2T(0.1)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('T.INV.2T(0.1, 6)')).to.almost.eql({error: null, result: 1.9431802743487372}, 1e-9);
  });

  it('TREND', () => {
    parser.setVariable('foo', [1, 9, 5, 7]);
    parser.setVariable('bar', [0, 4, 2, 3]);
    parser.setVariable('baz', [5, 8]);

    expect(parser.parse('TREND(foo, bar, baz)')).to.deep.equal({error: null, result: [11, 17]});
    expect(parser.parse('TREND(foo, bar, "dwe")')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('TRIMMEAN', () => {
    parser.setVariable('foo', [4, 5, 6, 7, 2, 3, 4, 5, 1, 2, 3]);
    parser.setVariable('bar', [4, 5, 'dwe', 7, 2, 3, 4, 5, 1, 2, 3]);

    expect(parser.parse('TRIMMEAN(foo, 0.2)')).to.almost.eql({error: null, result: 3.77}, 1e-9);
    expect(parser.parse('TRIMMEAN(bar, 0.2)')).to.deep.equal({error: '#VALUE?', result: null});
  });

  it('VARP', () => {
    expect(parser.parse('VARP()')).to.deep.equal({error: null, result: NaN});
    expect(parser.parse('VARP(1)')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('VARP(1, 2)')).to.almost.eql({error: null, result: 0.25}, 1e-9);
    expect(parser.parse('VARP(1, 2, 3)')).to.almost.eql({error: null, result: 0.66}, 1e-9);
    expect(parser.parse('VARP(1, 2, 3, 4)')).to.almost.eql({error: null, result: 1.25}, 1e-9);
    expect(parser.parse('VAR.P(1, 2, 3, 4)')).to.almost.eql({error: null, result: 1.25}, 1e-9);
  });

  it('VARS', () => {
    expect(parser.parse('VARS()')).to.deep.equal({error: null, result: -0});
    expect(parser.parse('VARS(1)')).to.deep.equal({error: null, result: NaN});
    expect(parser.parse('VARS(1, 2)')).to.almost.eql({error: null, result: 0.5}, 1e-9);
    expect(parser.parse('VARS(1, 2, 3)')).to.almost.eql({error: null, result: 1}, 1e-9);
    expect(parser.parse('VARS(1, 2, 3, 4)')).to.almost.eql({error: null, result: 1.66}, 1e-9);
    expect(parser.parse('VAR.S(1, 2, 3, 4)')).to.almost.eql({error: null, result: 1.66}, 1e-9);
    expect(parser.parse('VAR.S(1, 2, 3, 4, TRUE, "foo")')).to.almost.eql({error: null, result: 1.66}, 1e-9);
  });

  it('VARA', () => {
    expect(parser.parse('VARA()')).to.deep.equal({error: null, result: -0});
    expect(parser.parse('VARA(1)')).to.deep.equal({error: null, result: NaN});
    expect(parser.parse('VARA(1, 2)')).to.almost.eql({error: null, result: 0.5}, 1e-9);
    expect(parser.parse('VARA(1, 2, 3)')).to.almost.eql({error: null, result: 1}, 1e-9);
    expect(parser.parse('VARA(1, 2, 3, 4)')).to.almost.eql({error: null, result: 1.66}, 1e-9);
    expect(parser.parse('VARA(1, 2, 3, 4, TRUE, "foo")')).to.almost.eql({error: null, result: 2.166}, 1e-9);
  });

  it('VARPA', () => {
    expect(parser.parse('VARPA()')).to.deep.equal({error: null, result: NaN});
    expect(parser.parse('VARPA(1)')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('VARPA(1, 2)')).to.almost.eql({error: null, result: 0.25}, 1e-9);
    expect(parser.parse('VARPA(1, 2, 3)')).to.almost.eql({error: null, result: 0.66}, 1e-9);
    expect(parser.parse('VARPA(1, 2, 3, 4)')).to.almost.eql({error: null, result: 1.25}, 1e-9);
    expect(parser.parse('VARPA(1, 2, 3, 4, TRUE, "foo")')).to.almost.eql({error: null, result: 1.80555}, 1e-9);
  });

  it('WEIBULLDIST', () => {
    expect(parser.parse('WEIBULLDIST()')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('WEIBULLDIST(1)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('WEIBULLDIST(1, 2)')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse('WEIBULLDIST(1, 2, 3)')).to.almost.eql({error: null, result: 0.1988531815143044}, 1e-9);
    expect(parser.parse('WEIBULLDIST(1, 2, 3, TRUE)')).to.almost.eql({error: null, result: 0.10516068318563021}, 1e-9);
    expect(parser.parse('WEIBULL.DIST(1, 2, 3, TRUE)')).to.almost.eql({error: null, result: 0.10516068318563021}, 1e-9);
  });
});
