# frozen_string_literal: true

# fetches Belhydromet XML rad data and parses it to hash
class FetchBelhydrometRadData
  attr_reader :xml_data

  RAD_DATA_URL = 'https://rad.org.by/radiation.xml'

  def execute
    @xml_data = Nokogiri::XML(open(RAD_DATA_URL))

    parsed_data = {}

    (0...xml_length).each do |index|
      parsed_data[xml_titles[index]] = xml_rad_values[index]
    end

    parsed_data
  end

  private

  def xml_titles
    @xml_titles ||= xml_data.xpath('//title').map(&:content).slice(1..-1)
  end

  def xml_rad_values
    @xml_rad_values ||= xml_data.xpath('//rad').map(&:content).map(&:to_f)
  end

  def xml_length
    @xml_length ||= xml_rad_values.length
  end
end
